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

        // SEO Meta Tags
        $pageTitle = 'Hubungi Kami - Musville | PT. Madani Utama Selebes';
        $description = 'Hubungi PT. Madani Utama Selebes untuk pertanyaan mengenai investasi properti syariah, kemitraan, dan informasi lebih lanjut tentang proyek kami.';
        $imageUrl = $banner ? asset('storage/' . $banner->image) : asset('assets/logos/logo.png');
        $currentUrl = url('/contact');

        Meta::setTitle($pageTitle);
        Meta::setCanonical($currentUrl);
        Meta::setRobots('index, follow');

        Meta::addMeta('author', 'PT. Madani Utama Selebes');
        Meta::addMeta('description', $description);
        Meta::addMeta('keywords', 'contact musville, property inquiry, real estate contact, PT Madani Utama Selebes contact, shariah property questions, Indonesia real estate contact, kontak musville, hubungi musville');

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

        // Structured Data - ContactPage
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'ContactPage',
            'name' => $pageTitle,
            'description' => $description,
            'url' => $currentUrl,
        ];

        if ($contact) {
            $structuredData['mainEntity'] = [
                '@type' => 'Organization',
                'name' => 'PT. Madani Utama Selebes',
                'alternateName' => 'Musville',
            ];

            if ($contact->phone) {
                $structuredData['mainEntity']['telephone'] = $contact->phone;
            }
            if ($contact->email) {
                $structuredData['mainEntity']['email'] = $contact->email;
            }
            if ($contact->address) {
                $structuredData['mainEntity']['address'] = [
                    '@type' => 'PostalAddress',
                    'streetAddress' => $contact->address,
                    'addressCountry' => 'ID',
                ];
            }
        }

        Meta::addStructuredData($structuredData);

        return Inertia::render('Users/Contact', [
            'banner' => $banner,
            'contact' => $contact,
        ]);
    }
}
