<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('raw_materials')->insert([
            ['name' => 'Aluminium', 'type' => 'Metall', 'density' => 2.7, 'price' => 200.00, 'price_date' => '2025-04-01'],
            ['name' => 'Stahl', 'type' => 'Metall', 'density' => 7.85, 'price' => 500.00, 'price_date' => '2025-06-01'],
            ['name' => 'Kunststoff', 'type' => 'Polymer', 'density' => 1.2, 'price' => 100.00, 'price_date' => '2025-07-01']
        ]);
    }
}
