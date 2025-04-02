<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\OfferDrawing\StoreOfferDrawingRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\OfferDrawingResource;
use App\Models\Offer;
use App\Services\OfferDrawingService;

class OfferDrawingController extends BaseController
{
    public function __construct(private OfferDrawingService $service) {}

    public function store(StoreOfferDrawingRequest $request, int $id)
    {
        $offer = Offer::findOrFail($id);

        $drawing = $this->service->storeDrawing($offer, $request->file('file'));

        return ApiResponse::success(
            new OfferDrawingResource($drawing),
            'Drawing uploaded successfully'
        );
    }

    public function show(int $id)
    {
        $offer = Offer::findOrFail($id);

        $drawing = $this->service->getLatestDrawing($offer);

        return ApiResponse::success(
            $drawing ? new OfferDrawingResource($drawing) : null,
            $drawing ? 'Drawing loaded successfully' : 'No drawing found for this offer'
        );
    }
}
