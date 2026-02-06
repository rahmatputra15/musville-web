<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects
     */
    public function index(Request $request)
    {
        $query = Project::withCount(['images', 'videos'])
            ->orderBy('created_at', 'desc');

        // Search
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        $projects = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Projects', [
            'projects' => $projects,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Display the specified project with images and videos
     */
    public function show(Project $project)
    {
        $project->load(['images' => function ($query) {
            $query->orderBy('order');
        }, 'videos' => function ($query) {
            $query->orderBy('order');
        }]);

        return Inertia::render('Admin/ProjectDetail', [
            'project' => $project,
        ]);
    }

    /**
     * Store a newly created project
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'total_unit' => 'required|integer|min:0',
            'unit_sold' => 'required|integer|min:0',
            'status' => 'required|in:available,sold,coming_soon',
            'banner' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ], [
            'name.required' => 'The project name is required.',
            'name.max' => 'The project name may not be greater than 255 characters.',
            'total_unit.required' => 'The total unit is required.',
            'total_unit.integer' => 'The total unit must be an integer.',
            'total_unit.min' => 'The total unit must be at least 0.',
            'unit_sold.required' => 'The unit sold is required.',
            'unit_sold.integer' => 'The unit sold must be an integer.',
            'unit_sold.min' => 'The unit sold must be at least 0.',
            'status.required' => 'The status is required.',
            'status.in' => 'The selected status is invalid.',
            'banner.mimes' => 'The banner must be a file of type: jpeg, jpg, png, webp.',
            'banner.max' => 'The banner may not be greater than 2MB.',
        ]);

        // Handle banner upload
        if ($request->hasFile('banner')) {
            $validated['banner'] = $request->file('banner')->store('projects/banners', 'public');
        }

        Project::create($validated);

        return redirect()->back()->with('success', 'Project created successfully');
    }

    /**
     * Update the specified project
     */
    public function update(Request $request, Project $project)
    {
        // Check if only updating banner
        $onlyBanner = $request->hasFile('banner') &&
            !$request->has('name') &&
            !$request->has('total_unit') &&
            !$request->has('unit_sold') &&
            !$request->has('status');

        if ($onlyBanner) {
            // Validate only banner
            $validated = $request->validate([
                'banner' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
            ]);

            // Delete old banner if exists
            if ($project->banner && Storage::disk('public')->exists($project->banner)) {
                Storage::disk('public')->delete($project->banner);
            }

            $project->update([
                'banner' => $request->file('banner')->store('projects/banners', 'public')
            ]);

            return redirect()->back()->with('success', 'Banner updated successfully');
        }

        // Full project update
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'total_unit' => 'required|integer|min:0',
            'unit_sold' => 'required|integer|min:0',
            'status' => 'required|in:available,sold,coming_soon',
            'banner' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        // Handle banner upload
        if ($request->hasFile('banner')) {
            // Delete old banner if exists
            if ($project->banner && Storage::disk('public')->exists($project->banner)) {
                Storage::disk('public')->delete($project->banner);
            }
            $validated['banner'] = $request->file('banner')->store('projects/banners', 'public');
        }

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully');
    }

    /**
     * Update overview, facilities, area only
     */
    public function updateInfo(Request $request, Project $project)
    {
        $validated = $request->validate([
            'overview' => 'nullable|string',
            'facilities' => 'nullable|string',
            'area' => 'nullable|string',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Project information updated successfully');
    }

    /**
     * Remove the specified project
     */
    public function destroy(Project $project)
    {
        // Delete banner if exists
        if ($project->banner && Storage::disk('public')->exists($project->banner)) {
            Storage::disk('public')->delete($project->banner);
        }

        // Delete related images
        foreach ($project->images as $image) {
            if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
                Storage::disk('public')->delete($image->image_path);
            }
        }

        // Delete related videos
        foreach ($project->videos as $video) {
            if ($video->video_path && Storage::disk('public')->exists($video->video_path)) {
                Storage::disk('public')->delete($video->video_path);
            }
            if ($video->thumbnail && Storage::disk('public')->exists($video->thumbnail)) {
                Storage::disk('public')->delete($video->thumbnail);
            }
        }

        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully');
    }

    /**
     * Store a new project image
     */
    public function storeImage(Request $request, Project $project)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
            'caption' => 'nullable|string|max:255',
        ], [
            'image.required' => 'Please select an image to upload.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
        ]);

        // Get the last order number
        $lastOrder = $project->images()->max('order') ?? 0;

        // Handle image upload
        $imagePath = $request->file('image')->store('projects/images', 'public');

        // Create image record
        $project->images()->create([
            'image_path' => $imagePath,
            'caption' => $validated['caption'] ?? null,
            'order' => $lastOrder + 1,
        ]);

        return redirect()->back()->with('success', 'Image uploaded successfully');
    }

    /**
     * Delete a project image
     */
    public function destroyImage(Project $project, $imageId)
    {
        $image = $project->images()->findOrFail($imageId);

        // Delete image file from storage
        if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        // Delete image record
        $image->delete();

        return redirect()->back()->with('success', 'Image deleted successfully');
    }

    /**
     * Store a new project video
     */
    public function storeVideo(Request $request, Project $project)
    {
        $validated = $request->validate([
            'video' => 'required|file|mimes:mp4,webm,ogg|max:51200', // 50MB max
            'thumbnail' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
        ], [
            'video.required' => 'Please select a video to upload.',
            'video.file' => 'The video must be a file.',
            'video.mimes' => 'The video must be a file of type: mp4, webm, ogg.',
            'video.max' => 'The video may not be greater than 50MB.',
            'thumbnail.image' => 'The thumbnail must be an image.',
            'thumbnail.mimes' => 'The thumbnail must be a file of type: jpeg, jpg, png, webp.',
            'thumbnail.max' => 'The thumbnail may not be greater than 2MB.',
        ]);

        // Get the last order number
        $lastOrder = $project->videos()->max('order') ?? 0;

        // Handle video upload
        $videoPath = $request->file('video')->store('projects/videos', 'public');

        // Handle thumbnail upload if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('projects/thumbnails', 'public');
        }

        // Create video record
        $project->videos()->create([
            'video_path' => $videoPath,
            'thumbnail' => $thumbnailPath,
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'] ?? null,
            'order' => $lastOrder + 1,
        ]);

        return redirect()->back()->with('success', 'Video uploaded successfully');
    }

    /**
     * Delete a project video
     */
    public function destroyVideo(Project $project, $videoId)
    {
        $video = $project->videos()->findOrFail($videoId);

        // Delete video file from storage
        if ($video->video_path && Storage::disk('public')->exists($video->video_path)) {
            Storage::disk('public')->delete($video->video_path);
        }

        // Delete thumbnail file from storage
        if ($video->thumbnail && Storage::disk('public')->exists($video->thumbnail)) {
            Storage::disk('public')->delete($video->thumbnail);
        }

        // Delete video record
        $video->delete();

        return redirect()->back()->with('success', 'Video deleted successfully');
    }
}
