<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\CompanyGoal;
use App\Models\Journey;
use App\Models\Profile;
use App\Models\Statement;
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

        return Inertia::render('Users/AboutUs', [
            'banner' => $banner,
            'statement' => $statement,
            'profile' => $profile,
            'goals' => $goals,
            'journeys' => $journeys,
        ]);
    }
}
