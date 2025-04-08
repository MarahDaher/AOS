<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdditivesOffersRawMaterialsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('additives_offers_raw_materials')->insert([
            ['offer_id' => 1, 'raw_material_id' => 1, 'additives_id' => 1, 'share' => 10.0],
            ['offer_id' => 1, 'raw_material_id' => 2, 'additives_id' => 2, 'share' => 5.0],
            ['offer_id' => 2, 'raw_material_id' => 3, 'additives_id' => 3, 'share' => 7.0],
        ]);
    }
}
