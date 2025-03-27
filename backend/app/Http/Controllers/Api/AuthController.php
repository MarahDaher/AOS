<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Response;

class AuthController extends BaseController
{
    private AuthService $authService;


    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        if (!User::where('email', $request->email,)->exists()) {
            return ApiResponse::error('User not found', Response::HTTP_UNAUTHORIZED);
        }

        try {
            $token = $this->authService->login([
                'email' => $request->email,
                'password' => $request->password
            ]);

            if (!$token) {
                return ApiResponse::error('Invalid password', Response::HTTP_UNAUTHORIZED);
            }

            return ApiResponse::success($this->createNewToken($token));
        } catch (\Exception $e) {
            return $this->respondError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout()
    {
        $this->authService->logout();

        return ApiResponse::success(['message' => 'Successfully logged out']);
    }

    public function profile()
    {
        $user = $this->authService->getUserProfile();

        return ApiResponse::success(new UserResource($user->load('role')));
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @return array
     */
    protected function createNewToken($token): array
    {
        $user = $this->authService->getUserProfile()->load('role');

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => new UserResource($user),
        ];
    }
}
