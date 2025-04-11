<?php

namespace App\Http\Requests\Additives;

use Illuminate\Foundation\Http\FormRequest;

class GetAdditivesForRawMaterialRequest extends FormRequest
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
    public function rules()
    {
        return [
            'offer_id' => 'required|integer',
            'raw_material_id' => 'required|integer',
        ];
    }
}
