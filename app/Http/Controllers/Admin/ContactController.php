<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
  /**
   * Display the contact form
   */
  public function index()
  {
    // Get the first (and only) contact record
    $contact = Contact::first();

    return Inertia::render('Admin/Contact', [
      'contact' => $contact,
    ]);
  }

  /**
   * Update or create the contact
   */
  public function update(Request $request)
  {
    $validated = $request->validate([
      'email' => 'required|email|max:255',
      'phone' => 'required|string|max:255',
      'address' => 'required|string',
      'facebook' => 'nullable|string|max:255',
      'instagram' => 'nullable|string|max:255',
      'tiktok' => 'nullable|string|max:255',
      'youtube' => 'nullable|string|max:255',
      'monfri' => 'nullable|string|max:255',
      'sat' => 'nullable|string|max:255',
      'sun' => 'nullable|string|max:255',
    ]);

    $contact = Contact::first();

    if ($contact) {
      // Update existing record
      $contact->update($validated);
      $message = 'Contact information updated successfully';
    } else {
      // Create new record
      Contact::create($validated);
      $message = 'Contact information created successfully';
    }

    return redirect()->back()->with('success', $message);
  }
}
