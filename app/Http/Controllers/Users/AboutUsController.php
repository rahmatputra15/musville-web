<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\CompanyGoal;
use App\Models\Journey;
use App\Models\Profile;
use App\Models\Statement;
use App\Providers\Meta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'about-us')->first();
        $statement = Statement::first();
        $profile = Profile::first();
        $goals = CompanyGoal::all();
        $journeys = Journey::orderBy('year')->get(['year', 'description', 'status']);

        // SEO Meta Tags
        $pageTitle = 'Tentang Kami - Musville | PT. Madani Utama Selebes';
        $description = 'Pelajari tentang PT. Madani Utama Selebes - Sejarah, visi, misi, dan komitmen kami terhadap pengembangan properti berbasis syariah yang berkualitas dan berkelanjutan.';
        $imageUrl = $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png');
        $currentUrl = url('/about');

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'about musville, company profile, shariah developer, PT Madani Utama Selebes, real estate company, tentang musville, profil perusahaan, pengembang syariah');

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

        // Structured Data - AboutPage
        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'AboutPage',
            'name' => $pageTitle,
            'description' => $description,
            'url' => $currentUrl,
            'mainEntity' => [
                '@type' => 'Organization',
                'name' => 'PT. Madani Utama Selebes',
                'alternateName' => 'Musville',
                'description' => $description,
            ],
        ]);

        return Inertia::render('Users/AboutUs', [
            'banner' => $banner,
            'statement' => $statement,
            'profile' => $profile,
            'goals' => $goals,
            'journeys' => $journeys,
        ]);
    }
}
