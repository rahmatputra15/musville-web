<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Users/Home');
});

Route::get('/projects', function () {
    return Inertia::render('Users/Projects');
})->name('projects');

Route::get('/projects/{slug}', function ($slug) {
    // Data projects (nanti bisa diganti dengan data dari database)
    $projects = [
        [
            'id' => 1,
            'name' => 'Musville SkyView',
            'slug' => 'musville-skyview',
            'status' => 'Available',
            'unitsSold' => 2,
            'unitsTotal' => 30,
            'image' => '/assets/images/skyview.jpg',
            'gallery' => [
                '/assets/images/skyview/1.jpeg',
                '/assets/images/skyview/2.jpeg',
                '/assets/images/skyview/3.jpeg',
                '/assets/images/skyview/4.jpeg',
                '/assets/images/skyview/5.jpeg',
                '/assets/images/skyview/6.jpeg',
                '/assets/images/skyview/7.jpeg',
                '/assets/images/skyview/8.jpeg',
                '/assets/images/skyview/9.jpeg',
                '/assets/images/skyview/10.jpeg',
                '/assets/images/skyview/11.jpeg',
            ],
        ],
        [
            'id' => 2,
            'name' => 'Musville Residence Baliase',
            'slug' => 'musville-residence-baliase',
            'status' => 'Sold Out',
            'unitsSold' => 20,
            'unitsTotal' => 20,
            'image' => '/assets/images/baliase.jpg',
            'gallery' => [
                '/assets/images/baliase/1.jpeg',
                '/assets/images/baliase/2.jpeg',
                '/assets/images/baliase/3.jpeg',
                '/assets/images/baliase/4.jpeg',
                '/assets/images/baliase/5.jpeg',
                '/assets/images/baliase/6.jpeg',
                '/assets/images/baliase/7.jpeg',
                '/assets/images/baliase/8.jpeg',
                '/assets/images/baliase/9.jpeg',
                '/assets/images/baliase/10.jpeg',
                '/assets/images/baliase/11.jpeg',
                '/assets/images/baliase/12.jpeg',
                '/assets/images/baliase/13.jpeg',
                '/assets/images/baliase/14.jpeg',
                '/assets/images/baliase/15.jpeg',
                '/assets/images/baliase/16.jpeg',
                '/assets/images/baliase/17.jpeg',
                '/assets/images/baliase/18.jpeg',
                '/assets/images/baliase/19.jpeg',
                '/assets/images/baliase/20.jpeg',
                '/assets/images/baliase/21.jpeg',
                '/assets/images/baliase/22.jpeg',
                '/assets/images/baliase/23.jpeg',
                '/assets/images/baliase/24.jpeg',
                '/assets/images/baliase/25.jpeg',
            ],
        ],
        [
            'id' => 3,
            'name' => 'Musville 3 Residence',
            'slug' => 'musville-3-residence',
            'status' => 'Coming Soon',
            'unitsSold' => 0,
            'unitsTotal' => 20,
            'image' => '/assets/images/comming-soon.jpeg',
            'gallery' => ['/assets/images/comming-soon.jpeg'],
        ],
    ];

    // Cari project berdasarkan slug
    $project = collect($projects)->firstWhere('slug', $slug);

    // Jika tidak ditemukan, redirect ke halaman utama
    if (!$project) {
        return redirect('/')->with('error', 'Project not found');
    }

    return Inertia::render('Users/DetailProject', [
        'project' => $project
    ]);
})->name('projects.detail');

Route::get('/about', function () {
    return Inertia::render('Users/AboutUs');
})->name('about');

Route::get('/partnership', function () {
    return Inertia::render('Users/Partnership');
})->name('partnership');

Route::get('/contact', function () {
    return Inertia::render('Users/Contact');
})->name('contact');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', function () {
    // Handle login logic here
})->name('login.post');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');
