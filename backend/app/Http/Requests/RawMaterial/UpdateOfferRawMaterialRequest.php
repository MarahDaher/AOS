<?php

namespace App\Http\Requests\RawMaterial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfferRawMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'raw_material_id' => 'nullable|exists:raw_materials,id',
            'supplier' => 'nullable|string|max:63',
            'share' => 'nullable|numeric|min:0|max:100',
            'absolut_demand' => 'nullable|numeric|min:0',
            'price' => 'nullable|numeric|min:0',
            'price_date' => 'nullable|date',
        ];
    }
}
