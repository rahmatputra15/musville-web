<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Commitment;
use App\Models\Partnership;
use App\Providers\Meta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnershipController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'partnership')->first();
        $partnerships = Partnership::where('status', 'active')
            ->orderBy('created_at', 'asc')
            ->get();

        $commitments = Commitment::all();

        // SEO Meta Tags
        $pageTitle = 'Kemitraan - Musville | Peluang Investasi Properti Syariah';
        $description = 'Bergabunglah dalam peluang kemitraan kami sebagai investor atau agen. Jadilah bagian dari kisah pertumbuhan kami dalam pengembangan properti berbasis syariah di Indonesia.';
        $imageUrl = $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png');
        $currentUrl = url('/partnership');

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'partnership musville, property investment, agency opportunity, real estate partnership, shariah investment, Indonesia property development, kemitraan properti, investasi syariah, agen properti');

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

        // Structured Data - Service
        Meta::addStructuredData([
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'serviceType' => 'Real Estate Partnership',
            'name' => 'Program Kemitraan Musville',
            'description' => $description,
            'provider' => [
                '@type' => 'Organization',
                'name' => 'PT. Madani Utama Selebes',
                'alternateName' => 'Musville',
            ],
            'areaServed' => [
                '@type' => 'Country',
                'name' => 'Indonesia',
            ],
        ]);

        return Inertia::render('Users/Partnership', [
            'banner' => $banner,
            'partnerships' => $partnerships,
            'commitments' => $commitments,
        ]);
    }
}
