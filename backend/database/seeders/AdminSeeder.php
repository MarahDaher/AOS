<?php

namespace Database\Seeders;

use App\Config\RoleConstants;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@aos.com'],
            [
                'name' => 'AOS Admin',
                'password' => bcrypt('123123'),
                'role_id' => 1
            ]
        );

        $user->assignRole(RoleConstants::ADMIN_ROLE);
    }
}
