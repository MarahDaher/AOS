<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;


return new class extends Migration
{
    public function up(): void
    {
        DB::statement(<<<SQL
        CREATE OR REPLACE VIEW offers_raw_materials_calculated AS
        SELECT 
            r.*, 
            o_r.*,
            ROUND(
                r.price - (r.price * o.general_raw_material_purchase_discount / 100), 
                2
            ) AS `_price_minus_discount`,
            ROUND(
                (r.price * o_r.share / 100), 
                2
            ) AS `_price_share`,
            ROUND(
                (r.price - (r.price * o.general_raw_material_purchase_discount / 100)) *
                (o_r.share / 100), 
                2
            ) AS `_price_minus_discount_share`
        FROM raw_materials r
        JOIN offers_raw_materials o_r ON r.id = o_r.raw_material_id
        JOIN offers o ON o.id = o_r.offer_id;
        SQL);
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS offers_raw_materials_calculated');
    }
};
