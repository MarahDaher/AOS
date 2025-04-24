<?php

namespace App\Services;

use App\Models\OfferStatus;

class OfferStatusService
{
    public function getAll()
    {
        return OfferStatus::all();
    }
}
