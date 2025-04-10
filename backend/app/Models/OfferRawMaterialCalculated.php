<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferRawMaterialCalculated extends Model
{
    protected $table = 'offers_raw_materials_calculated';

    public $timestamps = false;


    protected $guarded = [];

    protected $casts = [
        'price_date' => 'date:Y-m-d',
    ];

    public function additives()
    {
        return $this->hasMany(AdditiveOfferRawMaterial::class, 'raw_material_id', 'raw_material_id');
    }
}
