<?php

namespace Database\Seeders;

use App\Models\RawMaterial;
use Illuminate\Database\Seeder;

class RawMaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            ['Aluminium 6061', 'Metall', 2.7, 3.50, '2025-03-01'],
            ['Aluminium 7075', 'Metall', 2.81, 5.80, '2025-03-02'],
            ['Edelstahl 304', 'Metall', 7.93, 6.40, '2025-03-03'],
            ['Edelstahl 316', 'Metall', 7.98, 7.20, '2025-03-04'],
            ['Polycarbonat', 'Kunststoff', 1.2, 2.30, '2025-03-05'],
            ['ABS', 'Kunststoff', 1.05, 1.80, '2025-03-06'],
            ['POM', 'Kunststoff', 1.41, 3.10, '2025-03-07'],
            ['Kupfer C110', 'Metall', 8.94, 9.50, '2025-03-08'],
            ['Messing CW614N', 'Metall', 8.47, 6.80, '2025-03-09'],
            ['Titan Grad 5', 'Metall', 4.43, 15.00, '2025-03-10'],
        ];

        foreach ($materials as [$name, $type, $density, $price, $price_date]) {
            RawMaterial::create(compact('name', 'type', 'density', 'price', 'price_date'));
        }
    }
}
