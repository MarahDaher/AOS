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

    public function show(string $id = null)
    {
        $offerId = (int) $id;

        if ($offerId === 0) {
            return ApiResponse::error(
                'Sie müssen zuerst ein Angebot erstellen, bevor Sie eine Datei hochladen können.',
                400
            );
        }

        $offer = Offer::find($offerId);

        if (!$offer) {
            return ApiResponse::error(
                'Angebot nicht gefunden.',
                404
            );
        }

        $drawing = $this->service->getLatestDrawing($offer);

        return ApiResponse::success(
            $drawing ? new OfferDrawingResource($drawing) : null,
            $drawing ? 'Zeichnung erfolgreich geladen.' : 'Keine Zeichnung für dieses Angebot gefunden.'
        );
    }
}
