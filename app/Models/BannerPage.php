<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BannerPage extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'page',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = ['image_url'];

    protected static function booted()
    {
        static::deleting(function ($banner) {
            // Delete image from storage
            if ($banner->image) {
                Storage::disk('public')->delete($banner->image);
            }
        });
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    public function getPageLabelAttribute()
    {
        $labels = [
            'projects' => 'Projects',
            'about-us' => 'About Us',
            'partnership' => 'Partnership',
            'contact' => 'Contact',
        ];

        return $labels[$this->page] ?? $this->page;
    }
}
