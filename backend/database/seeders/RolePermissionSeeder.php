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
            // info("Permission created or found: {$created->name}");
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
            PermissionConstants::DELETE_OFFER,
            PermissionConstants::EXPORT_OFFER,

            PermissionConstants::VIEW_BASIC_DATA,
            PermissionConstants::CREATE_BASIC_DATA,
            PermissionConstants::UPDATE_BASIC_DATA,

            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::CREATE_CALCULATION,
            PermissionConstants::UPDATE_CALCULATION,

            PermissionConstants::VIEW_PRICES,
            PermissionConstants::CREATE_PRICES,
            PermissionConstants::UPDATE_PRICES,

            PermissionConstants::VIEW_DRAWING,
            PermissionConstants::CREATE_DRAWING,
            PermissionConstants::UPDATE_DRAWING,

            PermissionConstants::VIEW_PROCESS_SHEET,
            PermissionConstants::CREATE_PROCESS_SHEET,
            PermissionConstants::UPDATE_PROCESS_SHEET,

            PermissionConstants::VIEW_USERS,
            PermissionConstants::VIEW_USER,
            PermissionConstants::CREATE_USER,
            PermissionConstants::UPDATE_USER,
            PermissionConstants::DELETE_USER,
            PermissionConstants::CHANGE_USER_PASSWORD,

            PermissionConstants::VIEW_ROLES,
            PermissionConstants::VIEW_ROLE,
            PermissionConstants::CREATE_ROLE,
            PermissionConstants::UPDATE_ROLE,
            PermissionConstants::DELETE_ROLE,

            PermissionConstants::VIEW_PERMISSIONS,
            PermissionConstants::VIEW_PERMISSION,
            PermissionConstants::CREATE_PERMISSION,
            PermissionConstants::UPDATE_PERMISSION,
            PermissionConstants::DELETE_PERMISSION,

            PermissionConstants::VIEW_RAW_MATERIALS,
            PermissionConstants::VIEW_RAW_MATERIAL,
            PermissionConstants::CREATE_RAW_MATERIAL,
            PermissionConstants::UPDATE_RAW_MATERIAL,
            PermissionConstants::DELETE_RAW_MATERIAL,

            PermissionConstants::VIEW_OFFER_RAW_MATERIALS,
            PermissionConstants::VIEW_OFFER_RAW_MATERIAL,
            PermissionConstants::CREATE_OFFER_RAW_MATERIAL,
            PermissionConstants::UPDATE_OFFER_RAW_MATERIAL,
            PermissionConstants::DELETE_OFFER_RAW_MATERIAL,

            PermissionConstants::VIEW_ADDITIVES,
            PermissionConstants::VIEW_ADDITIVE,
            PermissionConstants::CREATE_ADDITIVE,
            PermissionConstants::UPDATE_ADDITIVE,
            PermissionConstants::DELETE_ADDITIVE,

            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIALS,
            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIAL,
            PermissionConstants::CREATE_ADDITIVE_RAW_MATERIAL,
            PermissionConstants::UPDATE_ADDITIVE_RAW_MATERIAL,
            PermissionConstants::DELETE_ADDITIVE_RAW_MATERIAL,
        ];
    }

    private function salesPermissions(): array
    {
        return [
            PermissionConstants::VIEW_OFFERS,
            PermissionConstants::VIEW_OFFER,
            PermissionConstants::UPDATE_OFFER,

            PermissionConstants::VIEW_BASIC_DATA,
            PermissionConstants::UPDATE_BASIC_DATA,

            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::VIEW_PRICES,

            PermissionConstants::VIEW_DRAWING,
            PermissionConstants::UPDATE_DRAWING,

            PermissionConstants::VIEW_PROCESS_SHEET,

            PermissionConstants::VIEW_USER,

            PermissionConstants::VIEW_RAW_MATERIALS,
            PermissionConstants::VIEW_RAW_MATERIAL,

            PermissionConstants::VIEW_OFFER_RAW_MATERIALS,
            PermissionConstants::VIEW_OFFER_RAW_MATERIAL,

            PermissionConstants::VIEW_ADDITIVES,
            PermissionConstants::VIEW_ADDITIVE,

            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIALS,
            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIAL,

        ];
    }

    private function productionPermissions(): array
    {
        return [
            PermissionConstants::VIEW_OFFERS,
            PermissionConstants::VIEW_OFFER,

            PermissionConstants::VIEW_BASIC_DATA,
            PermissionConstants::VIEW_CALCULATION,
            PermissionConstants::VIEW_PRICES,
            PermissionConstants::VIEW_DRAWING,

            PermissionConstants::VIEW_PROCESS_SHEET,
            PermissionConstants::UPDATE_PROCESS_SHEET,

            PermissionConstants::VIEW_USER,

            PermissionConstants::VIEW_RAW_MATERIALS,
            PermissionConstants::VIEW_RAW_MATERIAL,

            PermissionConstants::VIEW_OFFER_RAW_MATERIALS,
            PermissionConstants::VIEW_OFFER_RAW_MATERIAL,

            PermissionConstants::VIEW_ADDITIVES,
            PermissionConstants::VIEW_ADDITIVE,

            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIALS,
            PermissionConstants::VIEW_ADDITIVE_RAW_MATERIAL,
        ];
    }
}
