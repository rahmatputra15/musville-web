<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Project;
use App\Providers\Meta;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'projects')->first();

        $projects = $this->getProjects();

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', 'Explore our premium property developments. Available projects, sold out units, and upcoming developments.');
        Meta::addMeta('keywords', 'musville projects, property developments, real estate projects, shariah housing, Indonesia property');
        Meta::addMeta('og:type', 'website');
        Meta::addMeta('og:title', 'Projects - Musville');
        Meta::addMeta('og:description', 'Explore our premium property developments. Available projects, sold out units, and upcoming developments.');
        Meta::addMeta('og:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('og:url', url('/projects'));
        Meta::addMeta('twitter:title', 'Projects - Musville');
        Meta::addMeta('twitter:description', 'Explore our premium property developments. Available projects, sold out units, and upcoming developments.');
        Meta::addMeta('twitter:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('twitter:card', 'summary_large_image');

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
                    'overview' => $project->overview,
                    'facilities' => $project->facilities,
                    'area' => $project->area,
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

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $project['name'] . ' - ' . $project['status'] . '. ' . $project['unitsSold'] . '/' . $project['unitsTotal'] . ' units sold.');
        Meta::addMeta('keywords', 'musville, ' . $project['name'] . ', property, real estate, shariah, islamic housing, Indonesia, PT Madani Utama Selebes');
        Meta::addMeta('og:type', 'website');
        Meta::addMeta('og:title', $project['name'] . ' - Musville');
        Meta::addMeta('og:description', $project['name'] . ' - ' . $project['status'] . '. ' . $project['unitsSold'] . '/' . $project['unitsTotal'] . ' units sold.');
        Meta::addMeta('og:image', $project ? asset($project['image']) : asset('assets/logos/logo.png'));
        Meta::addMeta('og:url', url('/projects/' . $project['slug']));
        Meta::addMeta('twitter:title', $project['name'] . ' - Musville');
        Meta::addMeta('twitter:description', $project['name'] . ' - ' . $project['status'] . '. ' . $project['unitsSold'] . '/' . $project['unitsTotal'] . ' units sold.');
        Meta::addMeta('twitter:image', $project ? asset($project['image']) : asset('assets/logos/logo.png'));
        Meta::addMeta('twitter:card', 'summary_large_image');

        return Inertia::render('Users/DetailProject', [
            'project' => $project
        ]);
    }
}
