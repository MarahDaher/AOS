<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\RawMaterial;

class RawMaterialFactory extends Factory
{
    protected $model = RawMaterial::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word . ' ' . $this->faker->randomNumber(),
            'type' => $this->faker->randomElement(['Metall', 'Kunststoff']),
            'density' => $this->faker->randomFloat(2, 0.5, 10),
            'price' => $this->faker->randomFloat(2, 1, 20),
            'price_date' => $this->faker->date(),
        ];
    }
}
