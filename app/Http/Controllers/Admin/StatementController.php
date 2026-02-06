<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Statement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StatementController extends Controller
{
    /**
     * Display the statement form
     */
    public function index()
    {
        // Get the first (and only) statement record
        $statement = Statement::first();

        return Inertia::render('Admin/Statement', [
            'statement' => $statement,
        ]);
    }

    /**
     * Update or create the statement
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'statement' => 'required|string',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ], [
            'statement.required' => 'The statement is required.',
            'name.required' => 'The name is required.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'position.required' => 'The position is required.',
            'position.max' => 'The position may not be greater than 255 characters.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, webp.',
            'image.max' => 'The image may not be greater than 2MB.',
        ]);

        $statement = Statement::first();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($statement && $statement->image && Storage::disk('public')->exists($statement->image)) {
                Storage::disk('public')->delete($statement->image);
            }
            $validated['image'] = $request->file('image')->store('statements', 'public');
        }

        if ($statement) {
            // Update existing record
            $statement->update($validated);
            $message = 'Statement updated successfully';
        } else {
            // Create new record
            Statement::create($validated);
            $message = 'Statement created successfully';
        }

        return redirect()->back()->with('success', $message);
    }
}
