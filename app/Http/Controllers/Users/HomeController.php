<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerHero;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        //https://www.svgrepo.com/collection/iconship-interface-icons/
        $banners = BannerHero::where('is_active', true)
            ->orderBy('order')
            ->get(['id', 'title', 'subtitle', 'subsubtitle', 'image', 'order', 'is_active']);

        $projects = \App\Models\Project::with(['images'])
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
                    'image' => $project->banner ? \Illuminate\Support\Facades\Storage::url($project->banner) : null,
                    'gallery' => $project->images->map(fn($img) => \Illuminate\Support\Facades\Storage::url($img->image_path))->all(),
                ];
            });

        $statement = \App\Models\Statement::first();
        $profile = \App\Models\Profile::first();
        $journeys = \App\Models\Journey::orderBy('year')->get(['year', 'description', 'status']);
        $goals = \App\Models\CompanyGoal::all();
        $partnerships = \App\Models\Partnership::where('status', 'active')
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('Users/Home', [
            'banner_header' => $banners->first() ?: null,
            'banners' => $banners,
            'projects' => $projects,
            'statement' => $statement,
            'profile' => $profile,
            'journeys' => $journeys,
            'goals' => $goals,
            'partnerships' => $partnerships,
        ]);
    }
}
