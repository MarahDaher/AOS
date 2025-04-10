<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AdditiveOfferRawMaterial extends Pivot
{
    protected $table = 'additives_offers_raw_materials';

    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'offer_id',
        'raw_material_id',
        'additives_id',
        'share',
    ];

    public function additive()
    {
        return $this->belongsTo(Additive::class, 'additives_id');
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class, 'offer_id');
    }
}
