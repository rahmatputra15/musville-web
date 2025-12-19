<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyGoal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CompanyGoalController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyGoal::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status === 'active');
        }

        $goals = $query->orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Goals', [
            'goals' => $goals,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ], [
            'title.required' => 'Title is required',
            'description.required' => 'Description is required',
            'order.required' => 'Order is required',
            'order.min' => 'Order must be at least 0',
        ]);

        CompanyGoal::create($validated);

        return redirect()->route('admin.about-us.goals.index')
            ->with('success', 'Goal created successfully');
    }

    public function update(Request $request, CompanyGoal $goal)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ], [
            'title.required' => 'Title is required',
            'description.required' => 'Description is required',
            'order.required' => 'Order is required',
            'order.min' => 'Order must be at least 0',
        ]);

        $goal->update($validated);

        return redirect()->route('admin.about-us.goals.index')
            ->with('success', 'Goal updated successfully');
    }

    public function destroy(CompanyGoal $goal)
    {
        $goal->delete();

        return redirect()->route('admin.about-us.goals.index')
            ->with('success', 'Goal deleted successfully');
    }
}
