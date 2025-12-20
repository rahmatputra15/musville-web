<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'projects')->first();

        $projects = $this->getProjects();
        return Inertia::render('Users/Projects', [
            'banner' => $banner,
            'projects' => $projects,
        ]);
    }

    public function getProjects()
    {
        return Project::with(['images'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'slug' => $project->slug,
                    'status' => $project->status,
                    'unitsSold' => $project->unit_sold,
                    'unitsTotal' => $project->total_unit,
                    'image' => $project->banner ? Storage::url($project->banner) : null,
                    'gallery' => $project->images->map(fn($img) => Storage::url($img->image_path))->all(),
                ];
            });
    }

    public function show($slug)
    {
        $projects = $this->getProjects();

        // Find project by slug
        $project = collect($projects)->firstWhere('slug', $slug);

        // If not found, redirect to home with error
        if (!$project) {
            return redirect('/')->with('error', 'Project not found');
        }

        return Inertia::render('Users/DetailProject', [
            'project' => $project
        ]);
    }
}
