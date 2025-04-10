<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferRawMaterial extends Model
{
    protected $table = 'offers_raw_materials';

    public $timestamps = false;

    public $incrementing = false;

    protected $primaryKey = null;

    protected $fillable = [
        'offer_id',
        'raw_material_id',
        'absolut_demand',
        'share',
        'supplier',
        'price',
        'price_date',
    ];

    protected $casts = [
        'price_date' => 'date:Y-m-d',
    ];
}
