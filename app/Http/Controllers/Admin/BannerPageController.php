<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerPageController extends Controller
{
    /**
     * Display a listing of banner pages
     */
    public function index(Request $request)
    {
        $query = BannerPage::orderBy('page', 'asc')->orderBy('order', 'asc')->orderBy('created_at', 'desc');

        // Search
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('subtitle', 'like', '%' . $request->search . '%');
        }

        // Filter by page
        if ($request->page_filter) {
            $query->where('page', $request->page_filter);
        }

        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $banners = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/BannerPage', [
            'banners' => $banners,
            'filters' => [
                'search' => $request->search,
                'page_filter' => $request->page_filter,
                'is_active' => $request->is_active,
            ],
        ]);
    }

    /**
     * Store a newly created banner page
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
            'page' => 'required|in:projects,about-us,partnership,contact',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'The title is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'subtitle.max' => 'The subtitle may not be greater than 255 characters.',
            'image.required' => 'The image is required.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
            'page.required' => 'The page is required.',
            'page.in' => 'The selected page is invalid.',
            'order.integer' => 'The order must be an integer.',
            'order.min' => 'The order must be at least 0.',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('banners/page', 'public');
        }

        // Set defaults
        $validated['order'] = $validated['order'] ?? 0;
        $validated['is_active'] = $request->has('is_active') ? $request->is_active : true;

        BannerPage::create($validated);

        return redirect()->back()->with('success', 'Banner page created successfully');
    }

    /**
     * Update the specified banner page
     */
    public function update(Request $request, BannerPage $bannerPage)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'page' => 'required|in:projects,about-us,partnership,contact',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'The title is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'subtitle.max' => 'The subtitle may not be greater than 255 characters.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
            'page.required' => 'The page is required.',
            'page.in' => 'The selected page is invalid.',
            'order.integer' => 'The order must be an integer.',
            'order.min' => 'The order must be at least 0.',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($bannerPage->image && Storage::disk('public')->exists($bannerPage->image)) {
                Storage::disk('public')->delete($bannerPage->image);
            }
            $validated['image'] = $request->file('image')->store('banners/page', 'public');
        }

        $validated['is_active'] = $request->has('is_active') ? $request->is_active : false;

        $bannerPage->update($validated);

        return redirect()->back()->with('success', 'Banner page updated successfully');
    }

    /**
     * Remove the specified banner page
     */
    public function destroy(BannerPage $bannerPage)
    {
        // Image deletion is handled by model's deleting event
        $bannerPage->delete();

        return redirect()->back()->with('success', 'Banner page deleted successfully');
    }
}
