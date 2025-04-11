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
            'price_per_kg' => $this->additive->price,
            'price_date' => $this->additive->price_date?->format('d.m.Y'),
            'dosage_percent' => $this->share,
        ];
    }
}
