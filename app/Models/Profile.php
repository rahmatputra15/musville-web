<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'starter',
        'starter_company',
        'business_unit',
        'our_story',
        'core_business',
        'our_commitment',
    ];
}
