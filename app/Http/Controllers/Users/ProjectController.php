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

        // SEO Meta Tags
        $pageTitle = 'Proyek Properti Syariah - Musville';
        $description = 'Jelajahi pengembangan properti premium kami. Proyek yang tersedia, unit yang telah terjual, dan pengembangan mendatang dengan konsep syariah dan berkelanjutan.';
        $imageUrl = $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png');
        $currentUrl = url('/projects');

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'musville projects, property developments, real estate projects, shariah housing, Indonesia property, properti syariah, proyek musville, perumahan syariah');

        // Open Graph
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

        // Structured Data - ItemList
        $itemListElements = [];
        foreach ($projects as $index => $project) {
            $itemListElements[] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'url' => url('/projects/' . $project['slug']),
                'name' => $project['name'],
            ];
        }

        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'itemListElement' => $itemListElements,
        ]);

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

        // SEO Meta Tags
        $pageTitle = $project['name'] . ' - Properti Syariah Musville';
        $description = $project['name'] . ' - ' . $project['status'] . '. ' . $project['unitsSold'] . '/' . $project['unitsTotal'] . ' unit terjual. ' . ($project['overview'] ? strip_tags(substr($project['overview'], 0, 120)) . '...' : 'Proyek properti syariah premium dari Musville.');
        $imageUrl = $project['image'] ? asset($project['image']) : asset('assets/logos/logo.png');
        $currentUrl = url('/projects/' . $project['slug']);

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'musville, ' . $project['name'] . ', property, real estate, syariah, islamic housing, Indonesia, PT Madani Utama Selebes, properti syariah, perumahan islami');

        // Open Graph
        Meta::addProperty('og:type', 'product');
        Meta::addProperty('og:site_name', 'Musville');
        Meta::addProperty('og:locale', 'id_ID');
        Meta::addProperty('og:title', $pageTitle);
        Meta::addProperty('og:description', $description);
        Meta::addProperty('og:image', $imageUrl);
        Meta::addProperty('og:image:width', '1200');
        Meta::addProperty('og:image:height', '630');
        Meta::addProperty('og:url', $currentUrl);
        Meta::addProperty('product:availability', $project['status'] === 'available' ? 'in stock' : 'out of stock');

        // Twitter Card
        Meta::addMeta('twitter:card', 'summary_large_image');
        Meta::addMeta('twitter:title', $pageTitle);
        Meta::addMeta('twitter:description', $description);
        Meta::addMeta('twitter:image', $imageUrl);

        // Structured Data - RealEstateListing
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'RealEstateListing',
            'name' => $project['name'],
            'description' => strip_tags($project['overview'] ?? ''),
            'url' => $currentUrl,
            'image' => array_merge([$imageUrl], $project['gallery'] ?? []),
        ];

        if ($project['area']) {
            $structuredData['address'] = [
                '@type' => 'PostalAddress',
                'addressLocality' => $project['area'],
                'addressCountry' => 'ID',
            ];
        }

        Meta::addStructuredData($structuredData);

        // Breadcrumb Structured Data
        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                [
                    '@type' => 'ListItem',
                    'position' => 1,
                    'name' => 'Home',
                    'item' => url('/'),
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 2,
                    'name' => 'Projects',
                    'item' => url('/projects'),
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $project['name'],
                    'item' => $currentUrl,
                ],
            ],
        ]);

        return Inertia::render('Users/DetailProject', [
            'project' => $project
        ]);
    }
}