<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'contact')->first();
        $contact = Contact::first();

        return Inertia::render('Users/Contact', [
            'banner' => $banner,
            'contact' => $contact,
        ]);
    }
}
