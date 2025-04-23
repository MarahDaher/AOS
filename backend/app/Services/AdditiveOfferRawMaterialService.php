<?php

namespace App\Services;


namespace App\Services;

use App\Models\AdditiveOfferRawMaterial;
use Illuminate\Support\Facades\Log;

class AdditiveOfferRawMaterialService
{
    public function update(array $data): AdditiveOfferRawMaterial
    {
        $updated = AdditiveOfferRawMaterial::where('offer_id', $data['offer_id'])
            ->where('raw_material_id', $data['raw_material_id'])
            ->where('additives_id', $data['additives_id']);

        $fieldsToUpdate = [];

        if (array_key_exists('price', $data)) {
            $fieldsToUpdate['price'] = $data['price'];
        }

        if (array_key_exists('share', $data)) {
            $fieldsToUpdate['share'] = $data['share'];
        }

        $updated->update($fieldsToUpdate);

        // Reload the model for response
        return AdditiveOfferRawMaterial::with('additive')
            ->where('offer_id', $data['offer_id'])
            ->where('raw_material_id', $data['raw_material_id'])
            ->where('additives_id', $data['additives_id'])
            ->firstOrFail();
    }
}
