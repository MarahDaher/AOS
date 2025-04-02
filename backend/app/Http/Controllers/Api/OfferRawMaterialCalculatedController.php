<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\RawMaterial\UpdateOfferRawMaterialDemandRequest;
use App\Http\Requests\RawMaterial\UpdateOfferRawMaterialRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\OfferRawMaterialCalculatedResource;
use App\Models\OfferRawMaterialCalculated;
use App\Services\OfferRawMaterialService;
use Illuminate\Support\Facades\DB;

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

        $data = $request->validated();

        $resource = $this->service->update($offerId, $rawMaterialId, $data);

        return ApiResponse::success($resource);
    }

    public function updateDemand(
        UpdateOfferRawMaterialDemandRequest $request,
        int $offerId,
        int $rawMaterialId
    ) {
        $data = $request->validated();

        $resource = $this->service->updateDemand($offerId, $rawMaterialId, $data);

        return ApiResponse::success($resource);
    }
}
