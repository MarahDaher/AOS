<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        // 🛠 Insert into raw_materials
        DB::table('raw_materials')->insert([
            ['name' => 'Aluminium 6061', 'type' => 'Metall', 'density' => 2.7, 'price' => 3.50, 'price_date' => '2025-03-01'],
            ['name' => 'Aluminium 7075', 'type' => 'Metall', 'density' => 2.81, 'price' => 5.80, 'price_date' => '2025-03-02'],
            ['name' => 'Edelstahl 304', 'type' => 'Metall', 'density' => 7.93, 'price' => 6.40, 'price_date' => '2025-03-03'],
            ['name' => 'Edelstahl 316', 'type' => 'Metall', 'density' => 7.98, 'price' => 7.20, 'price_date' => '2025-03-04'],
            ['name' => 'Polycarbonat', 'type' => 'Kunststoff', 'density' => 1.2, 'price' => 2.30, 'price_date' => '2025-03-05'],
            ['name' => 'ABS', 'type' => 'Kunststoff', 'density' => 1.05, 'price' => 1.80, 'price_date' => '2025-03-06'],
            ['name' => 'POM', 'type' => 'Kunststoff', 'density' => 1.41, 'price' => 3.10, 'price_date' => '2025-03-07'],
            ['name' => 'Kupfer C110', 'type' => 'Metall', 'density' => 8.94, 'price' => 9.50, 'price_date' => '2025-03-08'],
            ['name' => 'Messing CW614N', 'type' => 'Metall', 'density' => 8.47, 'price' => 6.80, 'price_date' => '2025-03-09'],
            ['name' => 'Titan Grad 5', 'type' => 'Metall', 'density' => 4.43, 'price' => 15.00, 'price_date' => '2025-03-10'],
        ]);

        // 🛠 Insert into offers_raw_materials
        DB::table('offers_raw_materials')->insert([
            ['offer_id' => 1, 'raw_material_id' => 1, 'absolut_demand' => 500.0, 'share' => 70, 'supplier' => 'Lieferant A'],
            ['offer_id' => 1, 'raw_material_id' => 3, 'absolut_demand' => 300.0, 'share' => 15, 'supplier' => 'Lieferant B'],
            ['offer_id' => 1, 'raw_material_id' => 5, 'absolut_demand' => 200.0, 'share' => 10, 'supplier' => 'Lieferant C'],
            ['offer_id' => 1, 'raw_material_id' => 6, 'absolut_demand' => 400.0, 'share' => 5,  'supplier' => 'Lieferant C'],

            ['offer_id' => 2, 'raw_material_id' => 2, 'absolut_demand' => 600.0, 'share' => 70, 'supplier' => 'Lieferant A'],
            ['offer_id' => 2, 'raw_material_id' => 4, 'absolut_demand' => 400.0, 'share' => 30, 'supplier' => 'Lieferant D'],

            ['offer_id' => 3, 'raw_material_id' => 1, 'absolut_demand' => 550.0, 'share' => 50, 'supplier' => 'Lieferant B'],
            ['offer_id' => 3, 'raw_material_id' => 6, 'absolut_demand' => 250.0, 'share' => 30, 'supplier' => 'Lieferant E'],
            ['offer_id' => 3, 'raw_material_id' => 7, 'absolut_demand' => 150.0, 'share' => 20, 'supplier' => 'Lieferant C'],
        ]);
    }
}
