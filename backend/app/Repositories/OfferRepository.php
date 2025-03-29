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
}
