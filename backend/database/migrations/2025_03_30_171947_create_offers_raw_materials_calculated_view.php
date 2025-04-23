<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;


return new class extends Migration
{
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE VIEW offers_raw_materials_calculated AS 
            SELECT 
            r.name, 
            r.type, 
            r.density,
            o_r.offer_id, 
            o_r.raw_material_id, 
            o_r.absolut_demand, 
            o_r.share, 
            o_r.supplier, 
            o_r.price,
            o_r.price_date,
            r.price as price_from_raw_material,

            (
            SELECT GROUP_CONCAT(a.name SEPARATOR ', ') 
            FROM additives a JOIN additives_offers_raw_materials aor ON (a.id=aor.additives_id) 
            WHERE aor.offer_id=o_r.offer_id AND r.id=aor.raw_material_id
            ) AS `_additives_concatenated`,

            -- additives price total per share
            (
  SELECT ROUND(SUM(aor.price * aor.share / 100), 2)            FROM additives_offers_raw_materials aor  
            WHERE aor.offer_id=o_r.offer_id AND r.id=aor.raw_material_id
            ) AS `_additives_price_sum`,

            -- price per kilo
            ROUND(
                o_r.price - (o_r.price * COALESCE(o.general_raw_material_purchase_discount, 0) / 100), 
                2
            ) AS `_price_minus_discount`,

            -- Preis (anteilig) {€]: price total of raw_material including additives relative, excluding raw_material_discount | relative to share
            -- Preis(raw_material in Offer) * share + _additives_price_sum  ||  * (1 - o_r.share/100))*o_r.share/100
            COALESCE (
                (
                SELECT ROUND( (o_r.price * (1-SUM(aor.share/100)) + SUM(aor.price * aor.share / 100)) * (o_r.share/100), 2)
                FROM additives_offers_raw_materials aor
                WHERE aor.offer_id=o_r.offer_id AND r.id=aor.raw_material_id
                )
                ,
                ROUND(o_r.price * (o_r.share/100) , 2)
            ) AS `_price_share`,



            COALESCE (
                (
                SELECT ROUND( (o_r.price * (1-SUM(aor.share/100) * (1 - COALESCE(o.general_raw_material_purchase_discount,0)) + SUM(aor.price * aor.share / 100)) * (o_r.share/100)), 2)
                FROM additives_offers_raw_materials aor
                WHERE aor.offer_id=o_r.offer_id AND r.id=aor.raw_material_id
                )
                ,
                ROUND (o_r.price * (1 - COALESCE(o.general_raw_material_purchase_discount,0) / 100) * (o_r.share/100) )
            ) AS `_price_minus_discount_share`

            
            FROM 
            raw_materials r
            JOIN 
            offers_raw_materials o_r ON r.id = o_r.raw_material_id
            JOIN 
            offers o ON o.id = o_r.offer_id;");
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS offers_raw_materials_calculated');
    }
};
