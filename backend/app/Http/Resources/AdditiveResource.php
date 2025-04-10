<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdditiveResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'price' => $this->price,
            'price_date' => $this->price_date?->format('Y-m-d'),
            'pivot' => [
                'offer_id' => $this->pivot->offer_id ?? null,
                'raw_material_id' => $this->pivot->raw_material_id ?? null,
                'share' => $this->pivot->share ?? null,
            ],
        ];
    }
}
