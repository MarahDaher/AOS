<?php

namespace App\Http\Collections;

use App\Http\Resources\OfferStatusResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OfferStatusCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($status) {
            return new OfferStatusResource($status);
        })->toArray();
    }
}
