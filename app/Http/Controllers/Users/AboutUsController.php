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

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', 'Learn about PT. Madani Utama Selebes - Our history, vision, mission, and commitment to quality shariah-compliant property development.');
        Meta::addMeta('keywords', 'about musville, company profile, shariah developer, PT Madani Utama Selebes, real estate company');
        Meta::addMeta('og:type', 'website');
        Meta::addMeta('og:title', 'About Us - Musville');
        Meta::addMeta('og:description', 'Learn about PT. Madani Utama Selebes - Our history, vision, mission, and commitment to quality shariah-compliant property development.');
        Meta::addMeta('og:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('og:url', url('/about-us'));
        Meta::addMeta('twitter:title', 'About Us - Musville');
        Meta::addMeta('twitter:description', 'Learn about PT. Madani Utama Selebes - Our history, vision, mission, and commitment to quality shariah-compliant property development.');
        Meta::addMeta('twitter:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('twitter:card', 'summary_large_image');

        return Inertia::render('Users/AboutUs', [
            'banner' => $banner,
            'statement' => $statement,
            'profile' => $profile,
            'goals' => $goals,
            'journeys' => $journeys,
        ]);
    }
}
