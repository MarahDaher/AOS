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

        // ✅ ADD THIS:
        if (empty($data)) {
            throw new \Exception('No data provided to update.');
        }

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
        // 1. Update the absolut_demand
        OfferRawMaterial::where('offer_id', $offerId)
            ->where('raw_material_id', $rawMaterialId)
            ->update($data);

        // 2. Get all raw materials for recalculating
        $allMaterials = OfferRawMaterial::where('offer_id', $offerId)->get();
        $totalDemand = $allMaterials->sum('absolut_demand');

        if ($totalDemand > 0) {
            foreach ($allMaterials as $material) {
                $newShare = ($material->absolut_demand / $totalDemand) * 100;
                OfferRawMaterial::where('offer_id', $offerId)
                    ->where('raw_material_id', $material->raw_material_id)
                    ->update([
                        'share' => round($newShare, 2),
                    ]);
            }
        }

        // 3. Try to get the updated material safely
        $updated = OfferRawMaterialCalculated::where('offer_id', $offerId)
            ->where('raw_material_id', $rawMaterialId)
            ->first();

        if (!$updated) {
            abort(404, 'Raw material not found for this offer.');
        }

        return new OfferRawMaterialCalculatedResource($updated);
    }
}
