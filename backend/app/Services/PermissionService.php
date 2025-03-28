<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\PermissionRepository;
use App\Repositories\UserRepository;

class PermissionService
{

    private PermissionRepository $permissionRepository;
    private UserRepository $userRepository;


    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Get all Permissions
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllPermissions()
    {
        return $this->permissionRepository->getAllPermissions();
    }

    /**
     * Checks if user has the given permission.
     *
     * @param string $permission The permission to check for.
     *
     * @return bool Whether the user has the permission or not.
     */
    public  function checkPermission(string $permission, int $userId)
    {
        $user = $this->userRepository->find($userId);
        return $this->permissionRepository->checkPermission($permission,  $user);
    }

    /**
     * Get the permissions for a specific user.
     *
     * @param User $user The user for which to retrieve the permissions.
     * @return array The user's permissions.
     */
    public function getUserPermissions(User $user)
    {
        return $this->permissionRepository->getUserPermissions($user);
    }
}
