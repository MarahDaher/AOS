<?php

namespace App\Services;

use App\Repositories\OfferRepository;

class OfferService
{
    public function __construct(private OfferRepository $repository) {}

    public function getAllSummary()
    {
        return $this->repository->getAllSummarized();
    }
}
