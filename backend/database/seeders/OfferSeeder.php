<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use Illuminate\Support\Facades\DB;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('offers')->insert([
            [
                'general_status' => 'Angebot',
                'general_offer_number' => 'OF12345',
                'general_profile_description' => 101,
                'general_creation_date' => '2025-04-08 09:00:00',
                'general_created_by_user_id' => 1,
                'general_color' => 'Blau',
                'general_packaging' => 5,
                'general_tool_number' => 'T1234',
                'general_order_number' => 'A123',
                'general_delivery_type' => 'frei',
                'general_article_number' => 'Testcompany A',
                'general_customer' => 'AN123',
                'general_customer_contact_person' => 'Max Mustermann',
                'general_customer_article_number' => 'C12345',
                'general_request_date' => '2025-04-01',
                'general_request_number' => 1001,
                'general_profile_crosssection' => 12.5,
                'general_raw_material_price_total_overwritten' => 150.00
            ],
            [
                'general_status' => 'Auftrag',
                'general_offer_number' => 'OF12346',
                'general_profile_description' => 102,
                'general_creation_date' => '2025-04-08 10:00:00',
                'general_created_by_user_id' => 2,
                'general_color' => 'Rot',
                'general_packaging' => 3,
                'general_tool_number' => 'T1235',
                'general_order_number' => 'A124',
                'general_delivery_type' => 'unfrei',
                'general_article_number' => 'Testcompany B',
                'general_customer' => 'AN124',
                'general_customer_contact_person' => 'Erika Mustermann',
                'general_customer_article_number' => 'C12346',
                'general_request_date' => '2025-04-02',
                'general_request_number' => 1002,
                'general_profile_crosssection' => 15.0,
                'general_raw_material_price_total_overwritten' => 160.00
            ],
            [
                'general_status' => 'Produziert',
                'general_offer_number' => 'OF12347',
                'general_profile_description' => 103,
                'general_creation_date' => '2025-04-08 11:00:00',
                'general_created_by_user_id' => 3,
                'general_color' => 'Grün',
                'general_packaging' => 2,
                'general_tool_number' => 'T1236',
                'general_order_number' => 'A125',
                'general_delivery_type' => 'frei',
                'general_article_number' => 'Testcompany C',
                'general_customer' => 'AN125',
                'general_customer_contact_person' => 'Hans Müller',
                'general_customer_article_number' => 'C12347',
                'general_request_date' => '2025-04-03',
                'general_request_number' => 1003,
                'general_profile_crosssection' => 14.0,
                'general_raw_material_price_total_overwritten' => 155.00
            ]
        ]);
    }
}
