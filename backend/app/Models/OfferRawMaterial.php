<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class OfferRawMaterial extends Model
{
    protected $table = 'offers_raw_materials';

    protected $primaryKey = null; // no auto-increment
    public $incrementing = false;

    protected $fillable = [
        'offer_id',
        'raw_material_id',
        'supplier',
        'share',
        'absolut_demand'
    ];

    public $timestamps = false;
}
