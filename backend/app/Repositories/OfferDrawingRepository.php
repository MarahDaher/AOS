<?php

namespace App\Repositories;

use App\Models\OfferDrawing;

class OfferDrawingRepository
{
    public function create(array $data): OfferDrawing
    {
        return OfferDrawing::create($data);
    }

    public function getLatestByOffer(int $offerId): ?OfferDrawing
    {
        return OfferDrawing::where('offer_id', $offerId)
            ->orderByDesc('upload_date')
            ->first();
    }
}
