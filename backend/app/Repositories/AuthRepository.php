<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class AuthRepository {

    /**
     * Logs the user in with the given credentials.
     *
     * @param array $credentials User's login credentials
     * @return mixed Return access token if authentication is successful, false otherwise
     * @throws AuthenticationException if authentication fails
     */
    public function login(array $credentials): bool|string
    {
        return Auth::attempt($credentials);
    }

     /**
     * Refreshes the token of the authenticated user.\n     *
     * @return string Returns the new token
     * @throws AuthenticationException if there is an error refreshing the token
     */
    public function refresh()
    {
        return JWTAuth::parseToken()->refresh();
    }

    /**
     * Logs out the authenticated user.
     *
     * @return void
     */
    public function logout(): void
    {
        Auth::logout();
    }

    /**
     * Returns the authenticated user data.
     *
     * @return User Returns the authenticated User model
     * @throws AuthenticationException if no authenticated user is found
     */
    public function getUserProfile(): User
    {
        $user = Auth::user();

        if ($user instanceof User) {
            return $user;
        } else {
            throw new Exception('User not authenticated');
        }
    }
}