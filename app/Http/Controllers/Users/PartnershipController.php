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

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', 'Join our partnership opportunities as an investor or agency. Be part of our growth story in shariah-compliant property development.');
        Meta::addMeta('keywords', 'partnership musville, property investment, agency opportunity, real estate partnership, shariah investment, Indonesia property development');
        Meta::addMeta('og:type', 'website');
        Meta::addMeta('og:title', 'Partnership - Musville');
        Meta::addMeta('og:description', 'Join our partnership opportunities as an investor or agency. Be part of our growth story in shariah-compliant property development.');
        Meta::addMeta('og:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('og:url', url('/partnership'));
        Meta::addMeta('twitter:title', 'Partnership - Musville');
        Meta::addMeta('twitter:description', 'Join our partnership opportunities as an investor or agency. Be part of our growth story in shariah-compliant property development.');
        Meta::addMeta('twitter:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('twitter:card', 'summary_large_image');

        return Inertia::render('Users/Partnership', [
            'banner' => $banner,
            'partnerships' => $partnerships,
            'commitments' => $commitments,
        ]);
    }
}
