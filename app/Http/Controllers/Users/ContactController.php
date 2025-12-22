<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\BannerPage;
use App\Models\Contact;
use App\Providers\Meta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $banner = BannerPage::where('page', 'contact')->first();
        $contact = Contact::first();

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', 'Get in touch with PT. Madani Utama Selebes. Contact us for inquiries about property investments, partnerships, and more.');
        Meta::addMeta('keywords', 'contact musville, property inquiry, real estate contact, PT Madani Utama Selebes contact, shariah property questions, Indonesia real estate contact');
        Meta::addMeta('og:type', 'website');
        Meta::addMeta('og:title', 'Contact - Musville');
        Meta::addMeta('og:description', 'Get in touch with PT. Madani Utama Selebes. Contact us for inquiries about property investments, partnerships, and more.');
        Meta::addMeta('og:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('og:url', url('/contact'));
        Meta::addMeta('twitter:title', 'Contact - Musville');
        Meta::addMeta('twitter:description', 'Get in touch with PT. Madani Utama Selebes. Contact us for inquiries about property investments, partnerships, and more.');
        Meta::addMeta('twitter:image', $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png'));
        Meta::addMeta('twitter:card', 'summary_large_image');

        return Inertia::render('Users/Contact', [
            'banner' => $banner,
            'contact' => $contact,
        ]);
    }
}
