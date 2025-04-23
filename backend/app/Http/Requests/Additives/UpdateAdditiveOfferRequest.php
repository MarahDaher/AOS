<?php

namespace App\Http\Requests\Additives;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdditiveOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'offer_id' => 'required|integer',
            'raw_material_id' => 'required|integer',
            'additives_id' => 'required|integer',
            'price' => 'nullable|numeric|min:0',
            'share' => 'nullable|numeric|min:0|max:100',
        ];
    }
}
