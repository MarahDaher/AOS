<?php

namespace App\Http\Collections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OfferCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return $this->collection->transform(function ($offer) {
            return [
                'id' => $offer->id,
                'general_offer_number' => $offer->general_offer_number,
                'general_customer' => $offer->general_customer,
                'general_profile_description' => $offer->general_profile_description,
                'general_creation_date' => $offer->general_creation_date->format('d.m.Y'),
            ];
        })->toArray();
    }
}
