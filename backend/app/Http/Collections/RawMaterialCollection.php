<?php

namespace App\Http\Collections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RawMaterialCollection extends ResourceCollection
{

    public function toArray(Request $request): array
    {
        return $this->collection->transform(function ($rawMaterial) {
            return [
                'id' => $rawMaterial->id,
                'name' => $rawMaterial->name,
                'type' => $rawMaterial->type,
                'price' => $rawMaterial->price,
                'price_date' => $rawMaterial->price_date->format('d.m.Y'),
                'density' => $rawMaterial->density,
            ];
        })->toArray();
    }
}
