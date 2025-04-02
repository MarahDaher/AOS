<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        Offer::insert([
            [
                'id' => 1,
                'general_status' => 'Angebot',
                'general_offer_number' => 'O-2025001',
                'general_profile_description' => '101',
                'general_creation_date' => '2025-03-28 10:00:00',
                'general_created_by_user_id' => 1,
                'general_color' => 'Silber',
                'general_packaging' => 5,
                'general_tool_number' => 'T-12345',
                'general_order_number' => 'OR-98765',
                'general_delivery_type' => 'frei',
                'general_article_number' => 'A-0001',
                'general_customer' => 'Kunde A',
                'general_customer_contact_person' => 'Max Mustermann',
                'general_customer_article_number' => 'CA-1001',
                'general_request_date' => '2025-04-01',
                'general_request_number' => 1001,
                'general_raw_material_price_total_overwritten' => 1500.50,
                'general_raw_material_purchase_discount' => 5.0,
                'general_comments' => 'Erstangebot für Kunde A',
            ],
            [
                'id' => 2,
                'general_status' => 'Auftrag',
                'general_offer_number' => 'O-2025002',
                'general_profile_description' => '102',
                'general_creation_date' => '2025-03-28 11:00:00',
                'general_created_by_user_id' => 2,
                'general_color' => 'Blau',
                'general_packaging' => 3,
                'general_tool_number' => 'T-67890',
                'general_order_number' => 'OR-54321',
                'general_delivery_type' => 'unfrei',
                'general_article_number' => 'A-0002',
                'general_customer' => 'Kunde B',
                'general_customer_contact_person' => 'Erika Beispiel',
                'general_customer_article_number' => 'CA-2002',
                'general_request_date' => '2025-04-05',
                'general_request_number' => 1002,
                'general_raw_material_price_total_overwritten' => 1750.00,
                'general_raw_material_purchase_discount' => 7.5,
                'general_comments' => 'Sonderanfertigung für Kunde B',
            ],
            [
                'id' => 3,
                'general_status' => 'Produziert',
                'general_offer_number' => 'O-2025003',
                'general_profile_description' => '103',
                'general_creation_date' => '2025-03-28 12:00:00',
                'general_created_by_user_id' => 3,
                'general_color' => 'Schwarz',
                'general_packaging' => 4,
                'general_tool_number' => 'T-11223',
                'general_order_number' => 'OR-33445',
                'general_delivery_type' => 'frei',
                'general_article_number' => 'A-0003',
                'general_customer' => 'Kunde C',
                'general_customer_contact_person' => 'Hans Beispiel',
                'general_customer_article_number' => 'CA-3003',
                'general_request_date' => '2025-04-10',
                'general_request_number' => 1003,
                'general_raw_material_price_total_overwritten' => 2000.75,
                'general_raw_material_purchase_discount' => 6.0,
                'general_comments' => 'Produktionsauftrag für Kunde C',
            ],
        ]);
    }
}
