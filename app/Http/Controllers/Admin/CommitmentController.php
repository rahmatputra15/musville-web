<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commitment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommitmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Commitment::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('subtitle', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $commitments = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Commitments', [
            'commitments' => $commitments,
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
            'status' => 'required|string|in:active,inactive',
        ], [
            'title.required' => 'Title is required',
            'status.required' => 'Status is required',
            'status.in' => 'Status must be either active or inactive',
        ]);

        Commitment::create($validated);

        return redirect()->route('admin.partnership.commitment.index')
            ->with('success', 'Commitment created successfully');
    }

    public function update(Request $request, Commitment $commitment)
    {
        $validated = $request->validate([
            'icon' => 'nullable|string',
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'status' => 'required|string|in:active,inactive',
        ], [
            'title.required' => 'Title is required',
            'status.required' => 'Status is required',
            'status.in' => 'Status must be either active or inactive',
        ]);

        $commitment->update($validated);

        return redirect()->route('admin.partnership.commitment.index')
            ->with('success', 'Commitment updated successfully');
    }

    public function destroy(Commitment $commitment)
    {
        $commitment->delete();

        return redirect()->route('admin.partnership.commitment.index')
            ->with('success', 'Commitment deleted successfully');
    }
}
