<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partnership;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnershipController extends Controller
{
    public function index(Request $request)
    {
        $query = Partnership::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('subtitle', 'like', '%' . $request->search . '%')
                    ->orWhere('benefit', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $partnerships = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Partnerships', [
            'partnerships' => $partnerships,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'icon' => 'nullable|string',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'benefit' => 'required|string',
            'contact' => 'required|string|max:255',
            'status' => 'required|string|in:active,inactive',
        ], [
            'title.required' => 'Title is required',
            'benefit.required' => 'Benefit is required',
            'contact.required' => 'Contact is required',
            'status.required' => 'Status is required',
            'status.in' => 'Status must be either active or inactive',
        ]);

        Partnership::create($validated);

        return redirect()->route('admin.partnership.programs.index')
            ->with('success', 'Partnership created successfully');
    }

    public function update(Request $request, Partnership $partnership)
    {
        $validated = $request->validate([
            'icon' => 'nullable|string',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'benefit' => 'required|string',
            'contact' => 'required|string|max:255',
            'status' => 'required|string|in:active,inactive',
        ], [
            'title.required' => 'Title is required',
            'benefit.required' => 'Benefit is required',
            'contact.required' => 'Contact is required',
            'status.required' => 'Status is required',
            'status.in' => 'Status must be either active or inactive',
        ]);

        $partnership->update($validated);

        return redirect()->route('admin.partnership.programs.index')
            ->with('success', 'Partnership updated successfully');
    }

    public function destroy(Partnership $partnership)
    {
        $partnership->delete();

        return redirect()->route('admin.partnership.programs.index')
            ->with('success', 'Partnership deleted successfully');
    }
}
