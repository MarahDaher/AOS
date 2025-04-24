<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            'Angebot',
            'Auftrag',
            'Gelöscht',
            'Produziert',
            'Versandt',
            'Vorkalkulation',
        ];

        foreach ($statuses as $status) {
            DB::table('offer_status')->updateOrInsert(
                ['name' => $status],
                ['name' => $status]
            );
        }
    }
}
