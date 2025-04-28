<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class RawMaterial extends Model
{

    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name', 'type', 'density', 'price', 'price_date'];

    protected $casts = [
        'price_date' => 'date',
    ];

    public function offers()
    {
        return $this->belongsToMany(Offer::class, 'offers_raw_materials')
            ->withPivot('absolut_demand', 'share', 'supplier');
    }

    public function additives()
    {
        return $this->belongsToMany(Additive::class, 'additives_offers_raw_materials', 'raw_material_id', 'additives_id')
            ->withPivot('offer_id', 'share');
    }

    public static function rawMaterialAllowedFields(): array
    {
        return [
            // raw material fields
            'raw_material_id',
            'supplier',
            'share',
            'price',
            'price_date',
            'absolut_demand',
            'type',
            'general_raw_material_purchase_discount',
            'general_raw_material_price_total_overwritten',

            //Additives
            'dosage_percent',
            'additives_price_sum',
        ];
    }
}
