<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $userId = $this->route('id');

        return [
            'name' => 'sometimes|required|string|max:255|unique:users,name,' . $userId,
            'email' => 'required|string|max:255|unique:users,email,' . $userId,
            'role_id' => 'sometimes|required|exists:roles,id',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Error',
            'data' => $validator->errors(),
        ], 422));
    }
}
