<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BannerHero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerHeroController extends Controller
{
    /**
     * Display a listing of banner heroes
     */
    public function index(Request $request)
    {
        $query = BannerHero::orderBy('order', 'asc')->orderBy('created_at', 'desc');

        // Search
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('subtitle', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        $banners = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/BannerHero', [
            'banners' => $banners,
            'filters' => [
                'search' => $request->search,
                'is_active' => $request->is_active,
            ],
        ]);
    }

    /**
     * Store a newly created banner hero
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subsubtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'The title is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'subtitle.max' => 'The subtitle may not be greater than 255 characters.',
            'subsubtitle.max' => 'The sub-subtitle may not be greater than 255 characters.',
            'image.required' => 'The image is required.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
            'order.integer' => 'The order must be an integer.',
            'order.min' => 'The order must be at least 0.',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('banners/hero', 'public');
        }

        // Set defaults
        $validated['order'] = $validated['order'] ?? 0;
        $validated['is_active'] = $request->has('is_active') ? $request->is_active : true;

        BannerHero::create($validated);

        return redirect()->back()->with('success', 'Banner hero created successfully');
    }

    /**
     * Update the specified banner hero
     */
    public function update(Request $request, BannerHero $bannerHero)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'subsubtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ], [
            'title.required' => 'The title is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'subtitle.max' => 'The subtitle may not be greater than 255 characters.',
            'subsubtitle.max' => 'The sub-subtitle may not be greater than 255 characters.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
            'order.integer' => 'The order must be an integer.',
            'order.min' => 'The order must be at least 0.',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($bannerHero->image && Storage::disk('public')->exists($bannerHero->image)) {
                Storage::disk('public')->delete($bannerHero->image);
            }
            $validated['image'] = $request->file('image')->store('banners/hero', 'public');
        }

        $validated['is_active'] = $request->has('is_active') ? $request->is_active : false;

        $bannerHero->update($validated);

        return redirect()->back()->with('success', 'Banner hero updated successfully');
    }

    /**
     * Remove the specified banner hero
     */
    public function destroy(BannerHero $bannerHero)
    {
        // Image deletion is handled by model's deleting event
        $bannerHero->delete();

        return redirect()->back()->with('success', 'Banner hero deleted successfully');
    }
}
