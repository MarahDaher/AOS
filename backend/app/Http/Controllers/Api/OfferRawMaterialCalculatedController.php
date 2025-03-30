<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\RawMaterial\UpdateOfferRawMaterialRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\OfferRawMaterialCalculatedResource;
use App\Models\OfferRawMaterialCalculated;
use App\Services\OfferRawMaterialService;

class OfferRawMaterialCalculatedController extends BaseController
{
    //

    public function __construct(private OfferRawMaterialService $service) {}

    public function index($offerId)
    {
        $data = OfferRawMaterialCalculated::where('offer_id', $offerId)->get();

        return ApiResponse::success(OfferRawMaterialCalculatedResource::collection($data));
    }


    public function update(UpdateOfferRawMaterialRequest $request, int $offerId, int $rawMaterialId)
    {
        \Log::info('Updating Offer Raw Material', [
            'offer_id' => $offerId,
            'raw_material_id' => $rawMaterialId,
        ]);

        $data = $request->validated();

        $resource = $this->service->update($offerId, $rawMaterialId, $data);

        return ApiResponse::success($resource);
    }
}
