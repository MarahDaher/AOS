<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class RawMaterial extends Model
{

    use HasFactory;

    protected $fillable = ['name', 'type', 'density', 'price', 'price_date'];

    public function offers()
    {
        return $this->belongsToMany(Offer::class, 'offers_raw_materials')
            ->withPivot('absolut_demand', 'share', 'supplier');
    }
}
