<?php

namespace App\Http\Collections;

use App\Http\Resources\AdditiveOfferRawMaterialResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AdditiveOfferRawMaterialCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray($request)
    {
        return [
            'additives' => $this->collection->transform(function ($item) {
                return new AdditiveOfferRawMaterialResource($item);
            }),
        ];
    }
}
