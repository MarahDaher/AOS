<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use App\Models\RawMaterial;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        RawMaterial::factory(10)->create();

        Offer::factory(5)->create()->each(function ($offer) {
            $materials = RawMaterial::inRandomOrder()->take(3)->get();
            foreach ($materials as $material) {
                $offer->rawMaterials()->attach($material->id, [
                    'absolut_demand' => fake()->randomFloat(2, 100, 1000),
                    'share' => fake()->randomFloat(2, 1, 100),
                    'supplier' => fake()->company
                ]);
            }
        });
    }
}
