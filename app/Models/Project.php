<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'total_unit',
        'unit_sold',
        'status',
        'banner',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = static::generateUniqueSlug($project->name);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('name') && empty($project->slug)) {
                $project->slug = static::generateUniqueSlug($project->name);
            }
        });
    }

    /**
     * Generate a unique slug.
     */
    protected static function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $count = 1;
        $originalSlug = $slug;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_unit' => 'integer',
            'unit_sold' => 'integer',
        ];
    }

    /**
     * Get the images for the project.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('order');
    }

    /**
     * Get the videos for the project.
     */
    public function videos(): HasMany
    {
        return $this->hasMany(ProjectVideo::class)->orderBy('order');
    }

    /**
     * Get the remaining units.
     */
    public function getRemainingUnitsAttribute(): int
    {
        return $this->total_unit - $this->unit_sold;
    }

    /**
     * Check if project is sold out.
     */
    public function getIsSoldOutAttribute(): bool
    {
        return $this->unit_sold >= $this->total_unit;
    }
}
