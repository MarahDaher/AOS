<?php

namespace App\Http\Requests\OfferRawMaterials;

use Illuminate\Foundation\Http\FormRequest;

class CreateOfferRawMaterialsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'offer_id' => 'required|integer|exists:offers,id',
            'raw_material_id' => 'required|integer|exists:raw_materials,id',
        ];
    }
}
