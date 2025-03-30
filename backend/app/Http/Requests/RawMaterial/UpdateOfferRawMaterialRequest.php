<?php

namespace App\Http\Requests\RawMaterial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfferRawMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'raw_material_id' => 'nullable|exists:raw_materials,id',
            'supplier' => 'nullable|string|max:63',
            'share' => 'nullable|numeric|min:0|max:100',
            'absolut_demand' => 'nullable|numeric|min:0',
        ];
    }
}
