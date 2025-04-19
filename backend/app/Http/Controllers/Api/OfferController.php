<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ApiResponse;
use App\Http\Collections\OfferCollection;
use App\Http\Controllers\BaseController;
use App\Http\Requests\Offer\UpdateOfferFieldRequest;
use App\Models\Offer;
use App\Services\OfferService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends BaseController
{
    public function __construct(private OfferService $service) {}

    public function index()
    {
        return ApiResponse::success(new OfferCollection($this->service->getAllSummary()));
    }

    public function show(int $id)
    {
        return ApiResponse::success($this->service->getOfferById($id));
    }

    /**
     * First blur: create offer with single field
     */
    public function store(Request $request)
    {
        $request->validate([
            'field' => 'required|string',
            'value' => 'nullable',
        ]);

        $userId = Auth::user()->id;


        try {
            $offer = $this->service->createOfferFromField(
                $request->input('field'),
                $request->input('value'),
                $userId
            );

            $updated_offer = $this->service->getOfferById($offer->id);

            return ApiResponse::success([
                'id' => $offer->id,
                'offer' => $updated_offer->fresh(['createdByUser']),
            ], 'Offer created');
        } catch (\InvalidArgumentException $e) {
            return ApiResponse::error($e->getMessage(), 422);
        }
    }

    /**
     * Subsequent blur: update field
     */
    public function update(UpdateOfferFieldRequest $request, $id)
    {
        try {
            $offer = Offer::findOrFail($id);

            $this->service->updateField(
                $offer,
                $request->input('field'),
                $request->input('value')
            );

            $updated_offer = $this->service->getOfferById($offer->id);

            return ApiResponse::success([
                'id' => $offer->id,
                'offer' => $updated_offer
            ], 'Field updated');
        } catch (\InvalidArgumentException $e) {
            return ApiResponse::error($e->getMessage(), 422);
        }
    }


    public function duplicate($id)
    {
        try {
            $newOffer = $this->service->duplicateOffer($id);

            return ApiResponse::success([
                'id' => $newOffer->id,
                'offer' => $newOffer->fresh(['createdByUser']),
            ], 'Offer duplicated successfully');
        } catch (\Exception $e) {
            return ApiResponse::error('Failed to duplicate offer: ' . $e->getMessage(), 400);
        }
    }

    public function destroy($id)
    {
        $offer = Offer::findOrFail($id);
        $offer->general_status = 'Gelöscht';
        $offer->save();

        return response()->json(['message' => 'Angebot als gelöscht markiert']);
    }


    public function getEditableFields(int $id)
    {
        $user = Auth::user();
        $offer = Offer::findOrFail($id);

        $fields = $this->service->editableFieldsByRoleAndStatus($user, $offer);

        return ApiResponse::success($fields, 'Editable fields retrieved successfully');
    }
}
