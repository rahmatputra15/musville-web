<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Laravel\Octane\Events\RequestReceived;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('contact', function () {
            return Contact::first();
        });

        Event::listen(function (RequestReceived $_) {
            Meta::cleanup();
        });
    }
}
