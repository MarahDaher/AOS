<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\AuthRepository;

class AuthService
{
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    /**
     * Logs in a user with the given credentials.
     */
    public function login(array $credentials): bool|string
    {
        return $this->authRepository->login($credentials);
    }

    public function refresh()
    {
        return $this->authRepository->refresh();
    }

    /**
     * Logs the user out.
     */
    public function logout(): void
    {
        $this->authRepository->logout();
    }

    /**
     * Retrieves the user's profile.
     */
    public function getUserProfile(): User
    {
        return $this->authRepository->getUserProfile();
    }
}
