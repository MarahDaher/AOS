<?php

namespace App\Services;

use App\Models\Role;
use App\Repositories\UserRepository;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Log;

use App\Models\User;
use Exception;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        if (!Auth::check()) {
            throw new AuthorizationException('You are not authorized.');
        }

        return $this->userRepository->getAll();
    }

    public function getUserById($id)
    {
        return $this->userRepository->find($id);
    }

    public function createUser(array $data)
    {
        $createdUser = $this->userRepository->create($data);

        if (isset($data['role_id'])) {
            $role = Role::find($data['role_id']);
            if ($role) {
                $createdUser->assignRole($role->name);
            }
        }

        try {
            event(new Registered($createdUser));
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
        }

        return $createdUser;
    }

    public function updateUser(int $id, array $userData): User
    {
        $updatedUser = $this->userRepository->update($id, $userData);
        // Assign the role after user update
        if (isset($userData['role_id'])) {
            $role = Role::find($userData['role_id']);
            if ($role) {
                $updatedUser->syncRoles([$role->name]);
            }
        }
        return $updatedUser;
    }

    public function deleteUser($id)
    {
        return $this->userRepository->delete($id);
    }

    public function changePassword(int $id, array $data): User
    {
        return $this->userRepository->changePassword($id, $data);
    }
}
