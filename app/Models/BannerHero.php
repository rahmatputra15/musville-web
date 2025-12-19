<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BannerHero extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'subsubtitle',
        'image',
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
}
