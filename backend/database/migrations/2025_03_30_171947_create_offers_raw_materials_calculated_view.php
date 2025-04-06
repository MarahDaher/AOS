<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;


return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
        CREATE OR REPLACE VIEW offers_raw_materials_calculated AS 
        SELECT 
          r.name, r.type, r.density,
          o_r.offer_id, o_r.raw_material_id, o_r.absolut_demand, o_r.share, o_r.supplier, 
          COALESCE(o_r.price, r.price) AS price,
          COALESCE(o_r.price_date, r.price_date) AS price_date,
        
          ROUND(r.price - (r.price * o.general_raw_material_purchase_discount / 100), 2) AS `_price_minus_discount`,
          ROUND(r.price * o_r.share / 100, 2) AS `_price_share`,
          ROUND((r.price - (r.price * o.general_raw_material_purchase_discount / 100)) * (o_r.share / 100), 2) AS `_price_minus_discount_share`
        
        FROM raw_materials r
        JOIN offers_raw_materials o_r ON r.id = o_r.raw_material_id
        JOIN offers o ON o.id = o_r.offer_id
        ");
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS offers_raw_materials_calculated');
    }
};
