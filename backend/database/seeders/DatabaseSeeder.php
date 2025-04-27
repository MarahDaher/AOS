<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed core things first
        $this->call([
            RolePermissionSeeder::class,
            AdminSeeder::class,
        ]);

        // 2.  Sync offer statuses BEFORE inserting offers
        Artisan::call('sync:offer-statuses');

        // 3. Now continue
        $this->call([
            OfferSeeder::class,
            RawMaterialSeeder::class,
            OfferRawMaterialSeeder::class,
            AdditiveSeeder::class,
            AdditivesOffersRawMaterialsSeeder::class,
        ]);
    }
}
