<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdditiveOfferRawMaterialResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->additive->id,
            'name' => $this->additive->name,
            'category' => $this->additive->category,
            'price' => $this->price,
            'price_date' => $this->additive->price_date?->format('d.m.Y'),
            'share' => $this->share,
        ];
    }
}
