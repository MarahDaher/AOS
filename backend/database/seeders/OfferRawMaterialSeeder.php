<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferRawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('offers_raw_materials')->insert([
            ['offer_id' => 1, 'raw_material_id' => 1, 'absolut_demand' => 500, 'share' => 70, 'supplier' => 'Lieferant A'],
            ['offer_id' => 1, 'raw_material_id' => 3, 'absolut_demand' => 300, 'share' => 15, 'supplier' => 'Lieferant B'],
            ['offer_id' => 1, 'raw_material_id' => 5, 'absolut_demand' => 200, 'share' => 10, 'supplier' => 'Lieferant C'],
            ['offer_id' => 1, 'raw_material_id' => 6, 'absolut_demand' => 400, 'share' => 5,  'supplier' => 'Lieferant C'],
            ['offer_id' => 2, 'raw_material_id' => 2, 'absolut_demand' => 600, 'share' => 70, 'supplier' => 'Lieferant A'],
            ['offer_id' => 2, 'raw_material_id' => 4, 'absolut_demand' => 400, 'share' => 30, 'supplier' => 'Lieferant D'],
            ['offer_id' => 3, 'raw_material_id' => 1, 'absolut_demand' => 550, 'share' => 50, 'supplier' => 'Lieferant B'],
            ['offer_id' => 3, 'raw_material_id' => 6, 'absolut_demand' => 250, 'share' => 30, 'supplier' => 'Lieferant E'],
            ['offer_id' => 3, 'raw_material_id' => 7, 'absolut_demand' => 150, 'share' => 20, 'supplier' => 'Lieferant C'],
        ]);
    }
}
