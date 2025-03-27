<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class RawMaterial extends Model
{
    protected $table = 'raw_material';

    protected $fillable = [
        'name',
        'type',
        'price_per_kg',
        'price_per_piece',
        'price_date',
    ];
}
