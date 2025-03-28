<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class PermissionRepository
{


    /**
     * Get all permissions.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllPermissions()
    {
        return Permission::orderBy('name')->get();
    }

    /**
     * Get permission by ID.
     *
     * @param int $id
     * @return Permission
     */
    public function getPermissionById(int $id): Permission
    {
        return Permission::findById($id);
    }

    /**
     * Checks if user has the given permission.
     *
     * @param string $permission The permission to check for.
     *
     * @return bool Whether the user has the permission or not.
     */
    public function checkPermission(string $permission, User $user): bool
    {
        return $user->hasPermissionTo($permission);
    }

    /**
     * Get the permissions for a specific user.
     *
     * @param User $user The user for which to retrieve the permissions.
     * @return array The user's permissions.
     */
    public function getUserPermissions(User $user): Collection
    {
        return $user->getAllPermissions();
    }
}
