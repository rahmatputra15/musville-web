<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Journey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JourneyController extends Controller
{
  public function index(Request $request)
  {
    $query = Journey::query();

    // Search
    if ($request->has('search') && $request->search) {
      $query->where(function ($q) use ($request) {
        $q->where('year', 'like', '%' . $request->search . '%')
          ->orWhere('description', 'like', '%' . $request->search . '%');
      });
    }

    // Filter by status
    if ($request->has('status') && $request->status !== '') {
      $query->where('status', $request->status);
    }

    $journeys = $query->orderBy('year', 'desc')->get();

    return Inertia::render('Admin/Journeys', [
      'journeys' => $journeys,
      'filters' => [
        'search' => $request->search,
        'status' => $request->status,
      ],
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'year' => 'required|string|max:255',
      'description' => 'required|string',
      'status' => 'required|string|in:active,inactive',
    ], [
      'year.required' => 'Year is required',
      'description.required' => 'Description is required',
      'status.required' => 'Status is required',
      'status.in' => 'Status must be either active or inactive',
    ]);

    Journey::create($validated);

    return redirect()->route('admin.about-us.journeys.index')
      ->with('success', 'Journey created successfully');
  }

  public function update(Request $request, Journey $journey)
  {
    $validated = $request->validate([
      'year' => 'required|string|max:255',
      'description' => 'required|string',
      'status' => 'required|string|in:active,inactive',
    ], [
      'year.required' => 'Year is required',
      'description.required' => 'Description is required',
      'status.required' => 'Status is required',
      'status.in' => 'Status must be either active or inactive',
    ]);

    $journey->update($validated);

    return redirect()->route('admin.about-us.journeys.index')
      ->with('success', 'Journey updated successfully');
  }

  public function destroy(Journey $journey)
  {
    $journey->delete();

    return redirect()->route('admin.about-us.journeys.index')
      ->with('success', 'Journey deleted successfully');
  }
}
