<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the profile form
     */
    public function index()
    {
        // Get the first (and only) profile record
        $profile = Profile::first();

        return Inertia::render('Admin/Profile', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update or create the profile
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'starter' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'starter_company' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'business_unit' => 'required|string|max:255',
            'our_story' => 'required|string',
            'core_business' => 'required|string',
            'our_commitment' => 'required|string',
        ], [
            'starter.required' => 'The starter year is required.',
            'starter.integer' => 'The starter year must be a valid number.',
            'starter.min' => 'The starter year must be at least 1900.',
            'starter.max' => 'The starter year is invalid.',
            'starter_company.required' => 'The company starter year is required.',
            'starter_company.integer' => 'The company starter year must be a valid number.',
            'starter_company.min' => 'The company starter year must be at least 1900.',
            'starter_company.max' => 'The company starter year is invalid.',
            'business_unit.required' => 'The business unit is required.',
            'business_unit.max' => 'The business unit may not be greater than 255 characters.',
            'our_story.required' => 'The our story is required.',
            'core_business.required' => 'The core business is required.',
            'our_commitment.required' => 'The our commitment is required.',
        ]);

        $profile = Profile::first();

        if ($profile) {
            // Update existing record
            $profile->update($validated);
            $message = 'Profile updated successfully';
        } else {
            // Create new record
            Profile::create($validated);
            $message = 'Profile created successfully';
        }

        return redirect()->back()->with('success', $message);
    }
}
