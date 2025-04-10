<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferRawMaterialCalculatedResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'offer_id' => $this->offer_id,
            'raw_material_id' => $this->raw_material_id,
            'name' => $this->name,
            'type' => $this->type,
            'price' => $this->price,
            'price_date' => $this->price_date->format('d.m.Y'),
            'supplier' => $this->supplier,
            'share' => $this->share,
            '_additives_concatenated' => $this->_additives_concatenated,
            '_additives_price_sum' => $this->_additives_price_sum,
            'absolut_demand' => $this->absolut_demand,
            '_price_minus_discount' => $this->_price_minus_discount,
            '_price_share' => $this->_price_share,
            '_price_minus_discount_share' => $this->_price_minus_discount_share,
        ];
    }
}
