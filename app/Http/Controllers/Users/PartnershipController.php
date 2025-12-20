<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Commitment;
use App\Models\Partnership;
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

        return Inertia::render('Users/Partnership', [
            'banner' => $banner,
            'partnerships' => $partnerships,
            'commitments' => $commitments,
        ]);
    }
}
