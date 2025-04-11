<?php

namespace App\Http\Requests\Additives;

use Illuminate\Foundation\Http\FormRequest;

class AttachAdditiveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'offer_id' => 'required|integer',
            'raw_material_id' => 'required|integer',
            'additives_id' => 'required|integer',
        ];
    }
}
