<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users,email',
            'password' => 'required',
            'role_id' => 'required|exists:roles,id',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Benutzername ist erforderlich.',
            'name.string' => 'Benutzername muss ein Text sein.',
            'name.max' => 'Benutzername darf maximal :max Zeichen lang sein.',

            'email.required' => 'E-Mail ist erforderlich.',
            'email.string' => 'E-Mail muss ein Text sein.',
            'email.unique' => 'Ein Benutzer mit dieser E-Mail existiert bereits.',

            'password.required' => 'Passwort ist erforderlich.',

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validierungsfehler',
            'data' => $validator->errors(),
        ], 422));
    }
}
