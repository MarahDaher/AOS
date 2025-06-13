<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
  public function up(): void
  {
    DB::statement(<<<SQL
        CREATE OR REPLACE VIEW offers_calculated AS 
        SELECT 
            oc.*

            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityA * oc.pricing_piece_length_prices_length1 / 1000 AS `_pricing_piece_length_prices_length1_quantityA`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityB * oc.pricing_piece_length_prices_length1 / 1000 AS `_pricing_piece_length_prices_length1_quantityB`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityC * oc.pricing_piece_length_prices_length1 / 1000 AS `_pricing_piece_length_prices_length1_quantityC`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityD * oc.pricing_piece_length_prices_length1 / 1000 AS `_pricing_piece_length_prices_length1_quantityD`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityE * oc.pricing_piece_length_prices_length1 / 1000 AS `_pricing_piece_length_prices_length1_quantityE`,

            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityA * oc.pricing_piece_length_prices_length2 / 1000 AS `_pricing_piece_length_prices_length2_quantityA`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityB * oc.pricing_piece_length_prices_length2 / 1000 AS `_pricing_piece_length_prices_length2_quantityB`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityC * oc.pricing_piece_length_prices_length2 / 1000 AS `_pricing_piece_length_prices_length2_quantityC`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityD * oc.pricing_piece_length_prices_length2 / 1000 AS `_pricing_piece_length_prices_length2_quantityD`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityE * oc.pricing_piece_length_prices_length2 / 1000 AS `_pricing_piece_length_prices_length2_quantityE`,

            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityA * oc.pricing_piece_length_prices_length3 / 1000 AS `_pricing_piece_length_prices_length3_quantityA`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityB * oc.pricing_piece_length_prices_length3 / 1000 AS `_pricing_piece_length_prices_length3_quantityB`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityC * oc.pricing_piece_length_prices_length3 / 1000 AS `_pricing_piece_length_prices_length3_quantityC`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityD * oc.pricing_piece_length_prices_length3 / 1000 AS `_pricing_piece_length_prices_length3_quantityD`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityE * oc.pricing_piece_length_prices_length3 / 1000 AS `_pricing_piece_length_prices_length3_quantityE`,

            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityA * oc.pricing_piece_length_prices_length4 / 1000 AS `_pricing_piece_length_prices_length4_quantityA`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityB * oc.pricing_piece_length_prices_length4 / 1000 AS `_pricing_piece_length_prices_length4_quantityB`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityC * oc.pricing_piece_length_prices_length4 / 1000 AS `_pricing_piece_length_prices_length4_quantityC`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityD * oc.pricing_piece_length_prices_length4 / 1000 AS `_pricing_piece_length_prices_length4_quantityD`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityE * oc.pricing_piece_length_prices_length4 / 1000 AS `_pricing_piece_length_prices_length4_quantityE`,

            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityA * oc.pricing_piece_length_prices_length5 / 1000 AS `_pricing_piece_length_prices_length5_quantityA`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityB * oc.pricing_piece_length_prices_length5 / 1000 AS `_pricing_piece_length_prices_length5_quantityB`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityC * oc.pricing_piece_length_prices_length5 / 1000 AS `_pricing_piece_length_prices_length5_quantityC`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityD * oc.pricing_piece_length_prices_length5 / 1000 AS `_pricing_piece_length_prices_length5_quantityD`,
            -- oc._pricing_endprices_graduated_without_confection_lfm_quantityE * oc.pricing_piece_length_prices_length5 / 1000 AS `_pricing_piece_length_prices_length5_quantityE`

        FROM offers_calculated_temp3 oc;
        SQL);
  }

  public function down(): void
  {
    DB::statement("DROP VIEW IF EXISTS offers_calculated");
  }
};
