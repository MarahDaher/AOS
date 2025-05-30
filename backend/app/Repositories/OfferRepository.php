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
            'general_status_id'
        ])
            ->with('status')
            ->whereHas('status', function ($query) {
                $query->where('name', '!=', 'Gelöscht');
            })
            ->get();
    }


    public function getOfferById(int $id): Offer
    {
        return Offer::with('createdByUser')->findOrFail($id);
    }

    public function duplicate(Offer $offer): Offer
    {
        $newOffer = $offer->replicate();
        $newOffer->general_offer_number = 'Copy of ' . $offer->general_offer_number;
        $newOffer->general_creation_date = now();
        $newOffer->save();

        return $newOffer;
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
