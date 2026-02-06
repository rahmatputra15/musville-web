<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        // Generate slugs for existing projects
        $projects = \App\Models\Project::all();
        foreach ($projects as $project) {
            $slug = \Illuminate\Support\Str::slug($project->name);
            $count = 1;
            $originalSlug = $slug;

            while (\App\Models\Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }

            $project->slug = $slug;
            $project->save();
        }

        // Make slug unique and not nullable
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
