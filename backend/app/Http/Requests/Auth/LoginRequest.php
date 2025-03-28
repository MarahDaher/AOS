<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // public function authorize()
    // {
    //     return true;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|exists:users',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages()
    {
        return [
            'email.exists' => 'Benutzer wurde nicht gefunden',
            'email.required' => 'E-Mail ist erforderlich',
            'password.required' => 'Passwort ist erforderlich',
            'password.min' => 'Das Passwort muss mindestens :min Zeichen lang sein',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => "Validierungsfehler",
            'data' => $validator->errors(),
        ], 422));
    }
}
