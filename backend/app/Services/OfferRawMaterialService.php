<?php

namespace App\Services;

use App\Repositories\OfferRawMaterialRepository;
use App\Http\Resources\OfferRawMaterialCalculatedResource;

class OfferRawMaterialService
{
    public function __construct(protected OfferRawMaterialRepository $repository) {}

    public function update(int $offerId, int $rawMaterialId, array $data): OfferRawMaterialCalculatedResource
    {
        return $this->repository->updateRawMaterial($data, $offerId, $rawMaterialId);
    }
}
