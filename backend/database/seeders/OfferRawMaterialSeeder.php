<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferRawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('offers_raw_materials')->insert([
            [
                'offer_id' => 1,
                'raw_material_id' => 1,
                'absolut_demand' => 1000.0,
                'share' => 50.0,
                'supplier' => 'Supplier A',
                'price' => 200.00,
                'price_date' => '2025-04-01',
            ],
            [
                'offer_id' => 1,
                'raw_material_id' => 2,
                'absolut_demand' => 1000.0,
                'share' => 50.0,
                'supplier' => 'Supplier A',
                'price' => 200.00,
                'price_date' => '2025-04-01',
            ],
            [
                'offer_id' => 1,
                'raw_material_id' => 3,
                'absolut_demand' => 1000.0,
                'share' => 50.0,
                'supplier' => 'Supplier A',
                'price' => 200.00,
                'price_date' => '2025-04-01',
            ],
            [
                'offer_id' => 2,
                'raw_material_id' => 3,
                'absolut_demand' => 300.0,
                'share' => 75.0,
                'supplier' => 'Supplier C',
                'price' => 100.00,
                'price_date' => '2025-04-01',
            ],
        ]);
    }
}
