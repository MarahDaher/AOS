<?php

namespace App\Repositories;

use App\Models\Offer;

class OfferRepository
{
    public function getAllSummarized()
    {
        return Offer::select([
            'id',
            'general_offer_number',
            'general_customer',
            'general_profile_description',
            'general_creation_date',
        ])->get();
    }

    public function getOfferById(int $id): Offer
    {
        return Offer::findOrFail($id);
    }


    public function createOffer(array $data): Offer
    {
        return Offer::create($data);
    }

    public function updateSingleField(Offer $offer, string $field, mixed $value): Offer
    {
        if (!$offer->exists) {
            throw new \Exception('Offer model is not persisted');
        }

        $offer->{$field} = $value;
        $offer->save();

        return $offer;
    }
}
