<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'AOS Admin',
                'email' => 'admin@aos.com',
                'password' => bcrypt('123123'),
                'role_id' => 1,
                'role' => 'admin',
            ],
            [
                'id' => 2,
                'name' => 'Sales Manager',
                'email' => 'sales@aos.com',
                'password' => bcrypt('123123'),
                'role_id' => 2,
                'role' => 'sales',
            ],
            [
                'id' => 3,
                'name' => 'Production Head',
                'email' => 'production@aos.com',
                'password' => bcrypt('123123'),
                'role_id' => 3,
                'role' => 'production',
            ],
        ];

        foreach ($users as $data) {
            $user = User::updateOrCreate(
                ['id' => $data['id']],
                collect($data)->except('role')->toArray()
            );

            $user->assignRole($data['role']);
        }
    }
}
