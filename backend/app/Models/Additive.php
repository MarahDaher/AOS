<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Additive extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name', 'category', 'price', 'price_date'];

    protected $casts = [
        'price_date' => 'date',
    ];

    public function additiveOffersRawMaterials()
    {
        return $this->hasMany(AdditiveOfferRawMaterial::class, 'additives_id', 'id');
    }

    public function offersRawMaterials()
    {
        return $this->belongsToMany(RawMaterial::class, 'additives_offers_raw_materials', 'additives_id', 'raw_material_id')
            ->withPivot('offer_id', 'share');
    }
}
