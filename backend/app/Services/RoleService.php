<?php

namespace App\Services;

use App\Models\Role;
use App\Repositories\RoleRepository;

class RoleService
{
    public function __construct(protected RoleRepository $roleRepo) {}

    public function getAllRoles()
    {
        return $this->roleRepo->all();
    }

    public function getRoleById($id)
    {
        return $this->roleRepo->find($id);
    }

    public function createRole(array $data)
    {
        return $this->roleRepo->create($data);
    }

    public function updateRole(Role $role, array $data)
    {
        return $this->roleRepo->update($role, $data);
    }

    public function deleteRole(Role $role)
    {
        return $this->roleRepo->delete($role);
    }
}
