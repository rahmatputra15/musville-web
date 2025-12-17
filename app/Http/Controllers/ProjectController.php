<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Get all projects data
     */
    private function getProjects()
    {
        // TODO: Nanti bisa diganti dengan data dari database
        return [
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
    }

    /**
     * Display a listing of projects
     */
    public function index()
    {
        $projects = $this->getProjects();

        return Inertia::render('Users/Projects', [
            'projects' => $projects
        ]);
    }

    /**
     * Display the specified project by slug
     */
    public function show($slug)
    {
        $projects = $this->getProjects();

        // Find project by slug
        $project = collect($projects)->firstWhere('slug', $slug);

        // If not found, redirect to home with error
        if (!$project) {
            return redirect('/')->with('error', 'Project not found');
        }

        return Inertia::render('Users/DetailProject', [
            'project' => $project
        ]);
    }
}
