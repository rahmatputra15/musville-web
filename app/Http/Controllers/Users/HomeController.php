<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerHero;
use App\Providers\Meta;
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

        // SEO Meta Tags
        $pageTitle = 'Musville - Pengembangan Properti Syariah Terbaik di Indonesia';
        $description = 'PT. Madani Utama Selebes - Perusahaan Pengembangan Syariah dan Berkelanjutan Terbaik. Bangunan Komersial, Resor & Perumahan Elit di Indonesia.';
        $imageUrl = $banners->first() ? asset('storage/' . $banners->first()->image) : asset('assets/logos/logo.png');
        $currentUrl = url('/');

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'musville, property, real estate, syariah, islamic housing, Indonesia, PT Madani Utama Selebes, properti syariah, perumahan islami, pengembang properti');

        // Open Graph (Social Media)
        Meta::addProperty('og:type', 'website');
        Meta::addProperty('og:site_name', 'Musville');
        Meta::addProperty('og:locale', 'id_ID');
        Meta::addProperty('og:title', $pageTitle);
        Meta::addProperty('og:description', $description);
        Meta::addProperty('og:image', $imageUrl);
        Meta::addProperty('og:image:width', '1200');
        Meta::addProperty('og:image:height', '630');
        Meta::addProperty('og:url', $currentUrl);

        // Twitter Card
        Meta::addMeta('twitter:card', 'summary_large_image');
        Meta::addMeta('twitter:title', $pageTitle);
        Meta::addMeta('twitter:description', $description);
        Meta::addMeta('twitter:image', $imageUrl);

        // Structured Data - Organization
        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'PT. Madani Utama Selebes',
            'alternateName' => 'Musville',
            'url' => 'https://musville.id',
            'logo' => asset('assets/logos/logo.png'),
            'description' => $description,
            'address' => [
                '@type' => 'PostalAddress',
                'addressCountry' => 'ID',
            ],
            'sameAs' => [
                // Add social media URLs here if available
            ],
        ]);

        // Structured Data - WebSite
        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => 'Musville',
            'url' => 'https://musville.id',
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => 'https://musville.id/projects?search={search_term_string}',
                'query-input' => 'required name=search_term_string',
            ],
        ]);

        return Inertia::render('Users/Home', [
            'banner_header' => $banners->first(),
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
