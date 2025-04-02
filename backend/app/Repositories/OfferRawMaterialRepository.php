<?php

namespace App\Repositories;

use App\Http\Resources\OfferRawMaterialCalculatedResource;
use App\Models\OfferRawMaterial;
use App\Models\OfferRawMaterialCalculated;
use Illuminate\Support\Facades\DB;

class OfferRawMaterialRepository
{
    public function updateRawMaterial(array $data, int $offerId, int $rawMaterialId): OfferRawMaterialCalculatedResource
    {
        $current = OfferRawMaterial::where('offer_id', $offerId)
            ->where('raw_material_id', $rawMaterialId)
            ->firstOrFail();

        if (empty($data['raw_material_id']) || $data['raw_material_id'] == $rawMaterialId) {
            OfferRawMaterial::where('offer_id', $offerId)
                ->where('raw_material_id', $rawMaterialId)
                ->update($data);

            $updated = OfferRawMaterialCalculated::where('offer_id', $offerId)
                ->where('raw_material_id', $rawMaterialId)
                ->first();

            return new OfferRawMaterialCalculatedResource($updated);
        }

        // raw_material_id تم تغييره
        $newRawMaterialId = $data['raw_material_id'];
        unset($data['raw_material_id']);

        DB::transaction(function () use ($offerId, $rawMaterialId, $data, $newRawMaterialId) {
            OfferRawMaterial::where('offer_id', $offerId)
                ->where('raw_material_id', $rawMaterialId)
                ->delete();

            OfferRawMaterial::create([
                'offer_id' => $offerId,
                'raw_material_id' => $newRawMaterialId,
                ...$data,
            ]);
        });

        $updated = OfferRawMaterialCalculated::where('offer_id', $offerId)
            ->where('raw_material_id', $newRawMaterialId)
            ->first();

        return new OfferRawMaterialCalculatedResource($updated);
    }


    public function updateRawMaterialDemand(array $data, int $offerId, int $rawMaterialId): OfferRawMaterialCalculatedResource
    {
        OfferRawMaterial::where('offer_id', $offerId)
            ->where('raw_material_id', $rawMaterialId)
            ->update($data);

        $updated = OfferRawMaterialCalculated::where('offer_id', $offerId)
            ->where('raw_material_id', $rawMaterialId)
            ->first();

        return new OfferRawMaterialCalculatedResource($updated);
    }
}
