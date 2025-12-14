<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Users/Home');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', function () {
    // Handle login logic here
})->name('login.post');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');
