<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Display the login view.
     */
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (!Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages([
                'email' => __('The provided credentials do not match our records.'),
            ]);
        }

        // Get authenticated user
        $user = Auth::user();

        // Check if user is active
        if (!$user->is_active) {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => __('Your account has been deactivated. Please contact administrator.'),
            ]);
        }

        // Update last login timestamp
        $user->update(['last_login_at' => now()]);

        // Regenerate session
        $request->session()->regenerate();

        // Redirect based on role
        if ($user->hasRole(['super-admin', 'admin', 'editor'])) {
            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->intended('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
