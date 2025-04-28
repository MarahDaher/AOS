<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOffersCalculatedView extends Migration
{
  public function up(): void
  {
    DB::statement(
      <<<SQL
  CREATE OR REPLACE VIEW offers_calculated AS 
  SELECT 
    oc.*,

-- , Jahresumsatz = AVG(Marge1-Meterpreis, Marge2-Meterpreis) * Jahresbedarf (o.`calculation_working_annual_requirement_estimated`)
    (
      (oc._pricing_endprices_graduated_without_confection_lfm_quantityA + oc._pricing_endprices_graduated_without_confection_lfm_quantityB)
      / 2 * oc.calculation_working_annual_requirement_estimated
    ) AS `_pricing_requirement_annual_sales`,

--  Fixkosten [€] ToDo: Erst Jahresumsatz berechnen Jahresumsatz-Rohstoffeinsatz-Zeitkosten
-- _pricing_requirement_annual_sales - o_c.`_pricing_costs_yearly_raw_material_quantity` - o_c.`_pricing_costs_yearly_time_costs_quantity`
    (
      (
        (oc._pricing_endprices_graduated_without_confection_lfm_quantityA + oc._pricing_endprices_graduated_without_confection_lfm_quantityB)
        / 2 * oc.calculation_working_annual_requirement_estimated
      ) 
      - oc._pricing_costs_yearly_raw_material_quantity - oc._pricing_costs_yearly_time_costs_quantity
    ) AS `_pricing_costs_yearly_fixcosts`,

-- Stück-Längen-Preise Staffel/m -- piece-length-prices graduated lfm
    oc._pricing_endprices_graduated_without_confection_lfm_quantityA AS `_pricing_piece_length_prices_graduated_lfm_quantityA`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityB AS `_pricing_piece_length_prices_graduated_lfm_quantityB`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityC AS `_pricing_piece_length_prices_graduated_lfm_quantityC`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityD AS `_pricing_piece_length_prices_graduated_lfm_quantityD`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityE AS `_pricing_piece_length_prices_graduated_lfm_quantityE`,
   
-- Stück-Längen-Preise Länge 625mm -- piece-length-prices length 625mm  
    oc._pricing_endprices_graduated_without_confection_lfm_quantityA * 625 / 1000 AS `_pricing_piece_length_prices_length625_quantityA`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityB * 625 / 1000 AS `_pricing_piece_length_prices_length625_quantityB`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityC * 625 / 1000 AS `_pricing_piece_length_prices_length625_quantityC`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityD * 625 / 1000 AS `_pricing_piece_length_prices_length625_quantityD`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityE * 625 / 1000 AS `_pricing_piece_length_prices_length625_quantityE`,
   
-- Stück-Längen-Preise Länge 1000mm -- piece-length-prices length 1000mm    
    oc._pricing_endprices_graduated_without_confection_lfm_quantityA * 1000 / 1000 AS `_pricing_piece_length_prices_length1000_quantityA`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityB * 1000 / 1000 AS `_pricing_piece_length_prices_length1000_quantityB`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityC * 1000 / 1000 AS `_pricing_piece_length_prices_length1000_quantityC`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityD * 1000 / 1000 AS `_pricing_piece_length_prices_length1000_quantityD`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityE * 1000 / 1000 AS `_pricing_piece_length_prices_length1000_quantityE`,
   
-- Stück-Längen-Preise Länge 1250mm -- piece-length-prices length 1250mm    
    oc._pricing_endprices_graduated_without_confection_lfm_quantityA * 1250 / 1000 AS `_pricing_piece_length_prices_length1250_quantityA`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityB * 1250 / 1000 AS `_pricing_piece_length_prices_length1250_quantityB`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityC * 1250 / 1000 AS `_pricing_piece_length_prices_length1250_quantityC`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityD * 1250 / 1000 AS `_pricing_piece_length_prices_length1250_quantityD`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityE * 1250 / 1000 AS `_pricing_piece_length_prices_length1250_quantityE`,
   
-- Stück-Längen-Preise Länge 1333mm -- piece-length-prices length 1333mm    
    oc._pricing_endprices_graduated_without_confection_lfm_quantityA * 1333 / 1000 AS `_pricing_piece_length_prices_length1333_quantityA`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityB * 1333 / 1000 AS `_pricing_piece_length_prices_length1333_quantityB`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityC * 1333 / 1000 AS `_pricing_piece_length_prices_length1333_quantityC`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityD * 1333 / 1000 AS `_pricing_piece_length_prices_length1333_quantityD`,
    oc._pricing_endprices_graduated_without_confection_lfm_quantityE * 1333 / 1000 AS `_pricing_piece_length_prices_length1333_quantityE`

  FROM offers_calculated_temp3 oc;
SQL
    );

    DB::statement(
      <<<SQL
      CREATE OR REPLACE VIEW offers_calculated_wordexport AS 
  SELECT 
    oc.*,

    (
      SELECT GROUP_CONCAT(ocr.name , " (" , ROUND(ocr.share) , "%" , COALESCE(CONCAT(", Additive: ",ocr._additives_concatenated),"") , ")" SEPARATOR ", ") 
      FROM `offers_calculated_temp3` oc2 JOIN `offers_raw_materials_calculated` ocr ON (oc2.id=ocr.offer_id) 
      WHERE oc2.id=oc.id 
    ) AS _ingredients_concatenated

  FROM offers_calculated oc
  SQL
    );
  }

  public function down(): void
  {
    DB::statement('DROP VIEW IF EXISTS offers_calculated');
  }
}
