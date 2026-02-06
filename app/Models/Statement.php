<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Statement extends Model
{
    protected $fillable = [
        'image',
        'statement',
        'name',
        'position',
    ];

    protected $appends = ['image_url'];

    /**
     * Boot the model.
     */
    protected static function booted()
    {
        static::deleting(function ($statement) {
            if ($statement->image && Storage::disk('public')->exists($statement->image)) {
                Storage::disk('public')->delete($statement->image);
            }
        });
    }

    /**
     * Get the image URL attribute.
     */
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
