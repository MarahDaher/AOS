<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdditiveSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('additives')->insert([
            ['name' => 'Antioxidans', 'category' => 'Chemisch', 'price' => 20.00, 'price_date' => '2025-04-01'],
            ['name' => 'Blau', 'category' => 'Farbe', 'price' => 5.00, 'price_date' => '2025-04-01'],
            ['name' => 'Weichmacher', 'category' => 'Chemisch', 'price' => 15.00, 'price_date' => '2025-04-01']
        ]);
    }
}
