<?php

namespace Database\Seeders;

use App\Config\PermissionConstants;
use App\Config\RoleConstants;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
{
    $this->createAllPermissions();
    $this->createAllRoles();
    $this->assignPermissionsToRoles();
}

    private function createAllPermissions(): void
    {
        foreach (PermissionConstants::toArray() as $permission) {
            $created = Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'api',
            ]);
            info("Permission created or found: {$created->name}");
        }
    }

    private function createAllRoles(): void
    {
        foreach (RoleConstants::ROLES as $role) {
            Role::firstOrCreate([
                'name' => $role['name'],
                'guard_name' => 'api',
            ]);
        }
    }

    private function assignPermissionsToRoles(): void
    {
        foreach ($this->rolePermissionsMap() as $roleName => $permissions) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $rolePermissions = Permission::whereIn('name', $permissions)->get();
                $role->syncPermissions($rolePermissions);
            }
        }
    }

    private function rolePermissionsMap(): array
    {
        return [
            RoleConstants::ADMIN_ROLE => $this->adminPermissions(),
            RoleConstants::SALES_ROLE => $this->salesPermissions(),
            RoleConstants::PRODUCTION_ROLE => $this->productionPermissions(),
        ];
    }

    private function adminPermissions(): array
    {
        return [
            PermissionConstants::VIEW_OFFERS,
            PermissionConstants::VIEW_OFFER,
            PermissionConstants::CREATE_OFFER,
            PermissionConstants::UPDATE_OFFER,
            PermissionConstants::DUPLICAET_OFFER,

            PermissionConstants::VIEW_GERNERAL_DATA,
            PermissionConstants::CREATE_GERNERAL_DATA,
            PermissionConstants::UPATE_GERNERAL_DATA,

            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::CREATE_CALCULATION,
            PermissionConstants::UPDATE_CALCULATION,

            PermissionConstants::VIEW_PRICES,
            PermissionConstants::CREATE_PRICES,
            PermissionConstants::UPDATE_PRICES,

            PermissionConstants::VIEW_DRAWERING,
            PermissionConstants::CREATE_DRAWERING,
            PermissionConstants::UPDATE_DRAWERING,

            PermissionConstants::VIEW_PROCESS_SHEET,
            PermissionConstants::CREATE_PROCESS_SHEET,
            PermissionConstants::UPDATE_PROCESS_SHEET,

            PermissionConstants::VIEW_USERS,
            PermissionConstants::CREATE_USER,
            PermissionConstants::UPDATE_USER,
            PermissionConstants::CHANGE_USER_PASSWORD,

            PermissionConstants::VIEW_ROLES,
            PermissionConstants::CREATE_ROLE,
            PermissionConstants::UPDATE_ROLE,
            PermissionConstants::DELETE_ROLE,

            PermissionConstants::VIEW_PERMISSIONS,
            PermissionConstants::VIEW_PERMISSION,
            PermissionConstants::CREATE_PERMISSION,
            PermissionConstants::UPDATE_PERMISSION,
            PermissionConstants::DELETE_PERMISSION,
        ];
    }

    private function salesPermissions(): array
    {
        return [
            PermissionConstants::VIEW_OFFERS,
            PermissionConstants::VIEW_OFFER,

            PermissionConstants::VIEW_GERNERAL_DATA,
            PermissionConstants::UPATE_GERNERAL_DATA,

            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::VIEW_PRICES,

            PermissionConstants::VIEW_DRAWERING,
            PermissionConstants::UPDATE_DRAWERING,

            PermissionConstants::VIEW_PROCESS_SHEET,
        ];
    }

    private function productionPermissions(): array
    {
        return [
            PermissionConstants::VIEW_OFFERS,
            PermissionConstants::VIEW_OFFER,

            PermissionConstants::VIEW_GERNERAL_DATA,
            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::VIEW_PRICES,
            PermissionConstants::VIEW_DRAWERING,

            PermissionConstants::VIEW_PROCESS_SHEET,
            PermissionConstants::UPDATE_PROCESS_SHEET,
        ];
    }
}
