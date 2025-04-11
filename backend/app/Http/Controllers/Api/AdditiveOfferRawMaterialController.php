<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Collections\AdditiveOfferRawMaterialCollection;
use App\Http\Requests\Additives\AttachAdditiveRequest;
use App\Http\Requests\Additives\GetAdditivesForRawMaterialRequest;
use App\Http\Resources\AdditiveOfferRawMaterialResource;
use App\Http\Resources\ApiResponse;
use App\Models\AdditiveOfferRawMaterial;

class AdditiveOfferRawMaterialController extends BaseController
{

    public function getAdditivesForRawMaterial(GetAdditivesForRawMaterialRequest $request)
    {

        $additives = AdditiveOfferRawMaterial::with('additive')
            ->where('offer_id', $request->offer_id)
            ->where('raw_material_id', $request->raw_material_id)
            ->get();


        return ApiResponse::success(new AdditiveOfferRawMaterialCollection($additives));
    }


    public function store(AttachAdditiveRequest $request)
    {
        $additiveOffer = AdditiveOfferRawMaterial::firstOrCreate([
            'offer_id' => $request->offer_id,
            'raw_material_id' => $request->raw_material_id,
            'additives_id' => $request->additives_id,
        ], [
            'share' => 0,
        ]);

        $additiveOffer->load('additive');

        return ApiResponse::success(new AdditiveOfferRawMaterialResource($additiveOffer), 'Additive hinzugefügt.');
    }

    public function destroy(AttachAdditiveRequest $request)
    {
        AdditiveOfferRawMaterial::where('offer_id', $request->offer_id)
            ->where('raw_material_id', $request->raw_material_id)
            ->where('additives_id', $request->additives_id)
            ->delete();

        return ApiResponse::success(null, 'Additive deleted successfully');
    }
}
