<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\BannerHeroController;
use App\Http\Controllers\Admin\BannerPageController;
use App\Http\Controllers\Admin\StatementController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\CompanyGoalController;
use App\Http\Controllers\Admin\JourneyController;
use App\Http\Controllers\Admin\PartnershipController;
use App\Http\Controllers\Admin\CommitmentController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Users\AboutUsController;
use App\Http\Controllers\Users\ContactController as UsersContactController;
use App\Http\Controllers\Users\HomeController;
use App\Http\Controllers\Users\PartnershipController as UsersPartnershipController;
use App\Http\Controllers\Users\ProjectController;

Route::get('/', HomeController::class);

Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.detail');

Route::get('/about', [AboutUsController::class, 'index'])->name('about');

Route::get('/partnership', [UsersPartnershipController::class, 'index'])->name('partnership');

Route::get('/contact', [UsersContactController::class, 'index'])->name('contact');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

// Logout Route
Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Admin Routes (Protected)
Route::middleware(['auth', 'role:super-admin|admin|editor'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        $stats = [
            'projects' => \App\Models\Project::count(),
            'users' => \App\Models\User::count(),
            'bannerHeroes' => \App\Models\BannerHero::count(),
            'bannerPages' => \App\Models\BannerPage::count(),
            'partnerships' => \App\Models\Partnership::count(),
            'commitments' => \App\Models\Commitment::count(),
            'goals' => \App\Models\CompanyGoal::count(),
            'journeys' => \App\Models\Journey::count(),
            'availableProjects' => \App\Models\Project::where('status', 'available')->count(),
            'soldProjects' => \App\Models\Project::where('status', 'sold')->count(),
            'comingSoonProjects' => \App\Models\Project::where('status', 'coming_soon')->count(),
        ];

        $recentProjects = \App\Models\Project::latest()
            ->take(5)
            ->get(['id', 'name', 'slug', 'status', 'banner', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'user' => auth()->user()->load('roles', 'permissions'),
            'stats' => $stats,
            'recentProjects' => $recentProjects,
        ]);
    })->name('dashboard');

    // Users Management
    Route::middleware('permission:view users')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::post('/users', [UserController::class, 'store'])->name('admin.users.store')->middleware('permission:create users');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update')->middleware('permission:edit users');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy')->middleware('permission:delete users');
        Route::post('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('admin.users.toggle-status')->middleware('permission:edit users');
    });

    // Projects Management
    Route::prefix('projects')->group(function () {
        Route::get('/', [AdminProjectController::class, 'index'])->name('admin.projects.index');
        Route::get('/{project}', [AdminProjectController::class, 'show'])->name('admin.projects.show');
        Route::post('/', [AdminProjectController::class, 'store'])->name('admin.projects.store');
        Route::put('/{project}', [AdminProjectController::class, 'update'])->name('admin.projects.update');
        Route::delete('/{project}', [AdminProjectController::class, 'destroy'])->name('admin.projects.destroy');

        // Project Images
        Route::post('/{project}/images', [AdminProjectController::class, 'storeImage'])->name('admin.projects.images.store');
        Route::delete('/{project}/images/{image}', [AdminProjectController::class, 'destroyImage'])->name('admin.projects.images.destroy');

        // Project Videos
        Route::post('/{project}/videos', [AdminProjectController::class, 'storeVideo'])->name('admin.projects.videos.store');
        Route::delete('/{project}/videos/{video}', [AdminProjectController::class, 'destroyVideo'])->name('admin.projects.videos.destroy');
    });

    // Banner Management
    Route::prefix('banner')->group(function () {
        // Banner Hero
        Route::prefix('hero')->group(function () {
            Route::get('/', [BannerHeroController::class, 'index'])->name('admin.banner.hero.index');
            Route::post('/', [BannerHeroController::class, 'store'])->name('admin.banner.hero.store');
            Route::put('/{bannerHero}', [BannerHeroController::class, 'update'])->name('admin.banner.hero.update');
            Route::delete('/{bannerHero}', [BannerHeroController::class, 'destroy'])->name('admin.banner.hero.destroy');
        });

        // Banner Page
        Route::prefix('page')->group(function () {
            Route::get('/', [BannerPageController::class, 'index'])->name('admin.banner.page.index');
            Route::post('/', [BannerPageController::class, 'store'])->name('admin.banner.page.store');
            Route::put('/{bannerPage}', [BannerPageController::class, 'update'])->name('admin.banner.page.update');
            Route::delete('/{bannerPage}', [BannerPageController::class, 'destroy'])->name('admin.banner.page.destroy');
        });
    });

    // About Us Management
    Route::prefix('about-us')->group(function () {
        // Statement
        Route::get('/statement', [StatementController::class, 'index'])->name('admin.about-us.statement.index');
        Route::post('/statement', [StatementController::class, 'update'])->name('admin.about-us.statement.update');

        // Profile
        Route::get('/profile', [ProfileController::class, 'index'])->name('admin.about-us.profile.index');
        Route::post('/profile', [ProfileController::class, 'update'])->name('admin.about-us.profile.update');

        // Goals
        Route::get('/goals', [CompanyGoalController::class, 'index'])->name('admin.about-us.goals.index');
        Route::post('/goals', [CompanyGoalController::class, 'store'])->name('admin.about-us.goals.store');
        Route::put('/goals/{goal}', [CompanyGoalController::class, 'update'])->name('admin.about-us.goals.update');
        Route::delete('/goals/{goal}', [CompanyGoalController::class, 'destroy'])->name('admin.about-us.goals.destroy');

        // Journeys
        Route::get('/journeys', [JourneyController::class, 'index'])->name('admin.about-us.journeys.index');
        Route::post('/journeys', [JourneyController::class, 'store'])->name('admin.about-us.journeys.store');
        Route::put('/journeys/{journey}', [JourneyController::class, 'update'])->name('admin.about-us.journeys.update');
        Route::delete('/journeys/{journey}', [JourneyController::class, 'destroy'])->name('admin.about-us.journeys.destroy');
    });

    // Partnership Management
    Route::prefix('partnership')->group(function () {
        // Programs
        Route::get('/programs', [PartnershipController::class, 'index'])->name('admin.partnership.programs.index');
        Route::post('/programs', [PartnershipController::class, 'store'])->name('admin.partnership.programs.store');
        Route::put('/programs/{partnership}', [PartnershipController::class, 'update'])->name('admin.partnership.programs.update');
        Route::delete('/programs/{partnership}', [PartnershipController::class, 'destroy'])->name('admin.partnership.programs.destroy');

        // Commitment
        Route::get('/commitment', [CommitmentController::class, 'index'])->name('admin.partnership.commitment.index');
        Route::post('/commitment', [CommitmentController::class, 'store'])->name('admin.partnership.commitment.store');
        Route::put('/commitment/{commitment}', [CommitmentController::class, 'update'])->name('admin.partnership.commitment.update');
        Route::delete('/commitment/{commitment}', [CommitmentController::class, 'destroy'])->name('admin.partnership.commitment.destroy');
    });

    // Contact Management
    Route::get('/contact', [ContactController::class, 'index'])->name('admin.contact.index');
    Route::post('/contact', [ContactController::class, 'update'])->name('admin.contact.update');
});
