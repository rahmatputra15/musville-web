<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\UserController;

Route::get('/', function () {
    return Inertia::render('Users/Home');
});

Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.detail');

Route::get('/about', function () {
    return Inertia::render('Users/AboutUs');
})->name('about');

Route::get('/partnership', function () {
    return Inertia::render('Users/Partnership');
})->name('partnership');

Route::get('/contact', function () {
    return Inertia::render('Users/Contact');
})->name('contact');

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
        return Inertia::render('Admin/Dashboard', [
            'user' => auth()->user()->load('roles', 'permissions'),
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
});
