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

--  Staffel / m
    (
      ((oc.`_pricing_costs_calc_time_costs_quantity` + oc.`_pricing_costs_calc_raw_material_price_total` 
      + oc.`_calculation_additional_setup_costs_total` + oc.`_pricing_endprices_calc_packing_costs`
      + oc.`_pricing_endprices_calc_transport_costs` + oc.`_pricing_endprices_calc_print_costs`)
      / oc.`calculation_quantityA`)
      + oc.`_calculation_working_allocation_costs_lfm`
      + oc.`pricing_costs_calc_price_additional_lfm`
    ) +
    (
      ((oc.`_pricing_costs_calc_time_costs_quantity` + oc.`_pricing_costs_calc_raw_material_price_total` 
      + oc.`_calculation_additional_setup_costs_total` + oc.`_pricing_endprices_calc_packing_costs`
      + oc.`_pricing_endprices_calc_transport_costs` + oc.`_pricing_endprices_calc_print_costs`)
      / oc.`calculation_quantityA`)
      + oc.`_calculation_working_allocation_costs_lfm`
      + oc.`pricing_costs_calc_price_additional_lfm`
    ) * (calculation_working_discount + calculation_working_profit + calculation_working_commission) / 100 
    AS `_pricing_endprices_graduated_without_confection_lfm_quantityA`,

--  (ZwischenmeterpreisLFM_B + WerkzeugkostenumlageLFM + ZusatzkostenLFM) + 
--  (ZwischenmeterpreisLFM_B + WerkzeugkostenumlageLFM + ZusatzkostenLFM) * (Provision + Gewinn + Zahlungsziel) / 100
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityB + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityB + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) AS `_pricing_endprices_graduated_without_confection_lfm_quantityB`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityC + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityC + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) AS `_pricing_endprices_graduated_without_confection_lfm_quantityC`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityD + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityD + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) AS `_pricing_endprices_graduated_without_confection_lfm_quantityD`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityE + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityE + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) AS `_pricing_endprices_graduated_without_confection_lfm_quantityE`,


--  Staffel / stk =   _pricing_endprices_graduated_without_confection_lfm_quantityA / general_packaging / 1000
    (
      (
        (
          ((oc.`_pricing_costs_calc_time_costs_quantity` + oc.`_pricing_costs_calc_raw_material_price_total` 
          + oc.`_calculation_additional_setup_costs_total` + oc.`_pricing_endprices_calc_packing_costs`
          + oc.`_pricing_endprices_calc_transport_costs` + oc.`_pricing_endprices_calc_print_costs`)
          / oc.`calculation_quantityA`)
          + oc.`_calculation_working_allocation_costs_lfm`
          + oc.`pricing_costs_calc_price_additional_lfm`
        ) +
        (
          ((oc.`_pricing_costs_calc_time_costs_quantity` + oc.`_pricing_costs_calc_raw_material_price_total` 
          + oc.`_calculation_additional_setup_costs_total` + oc.`_pricing_endprices_calc_packing_costs`
          + oc.`_pricing_endprices_calc_transport_costs` + oc.`_pricing_endprices_calc_print_costs`)
          / oc.`calculation_quantityA`)
          + oc.`_calculation_working_allocation_costs_lfm`
          + oc.`pricing_costs_calc_price_additional_lfm`
        ) * (calculation_working_discount + calculation_working_profit + calculation_working_commission) / 100 
      ) * oc.general_packaging / 1000      
    ) AS `_pricing_endprices_graduated_without_confection_stk_quantityA`,
    
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityB + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityB + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) * oc.general_packaging / 1000 
    AS `_pricing_endprices_graduated_without_confection_stk_quantityB`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityC + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityC + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) * oc.general_packaging / 1000 
    AS `_pricing_endprices_graduated_without_confection_stk_quantityC`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityD + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityD + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) * oc.general_packaging / 1000 
    AS `_pricing_endprices_graduated_without_confection_stk_quantityD`,
    (
      (_pricing_graduated_calculation_subtotal_lfm_quantityE + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) + 
      ((_pricing_graduated_calculation_subtotal_lfm_quantityE + _calculation_working_allocation_costs_lfm + pricing_costs_calc_price_additional_lfm) *
      (calculation_working_commission + calculation_working_profit + calculation_working_discount) / 100)
    ) * oc.general_packaging / 1000 
    AS `_pricing_endprices_graduated_without_confection_stk_quantityE`,


--  Stück = Menge / Aufmachung * 1000
    CEILING (
      oc.calculation_quantityA / oc.general_packaging * 1000
    )  AS `_pricing_endprices_graduated_pieces_quantityA`,
    CEILING (
      oc.calculation_quantityB / oc.general_packaging * 1000
    )  AS `_pricing_endprices_graduated_pieces_quantityB`,
    CEILING (
      oc.calculation_quantityC / oc.general_packaging * 1000
    )  AS `_pricing_endprices_graduated_pieces_quantityC`,
    CEILING (
      oc.calculation_quantityD / oc.general_packaging * 1000
    )  AS `_pricing_endprices_graduated_pieces_quantityD`,
    CEILING (
      oc.calculation_quantityE / oc.general_packaging * 1000
    )  AS `_pricing_endprices_graduated_pieces_quantityE`,


--  Staffel / m
    -1 AS `_pricing_endprices_graduated_with_confection_lfm_quantityA`,
    -1 AS `_pricing_endprices_graduated_with_confection_lfm_quantityB`,
    -1 AS `_pricing_endprices_graduated_with_confection_lfm_quantityC`,
    -1 AS `_pricing_endprices_graduated_with_confection_lfm_quantityD`,
    -1 AS `_pricing_endprices_graduated_with_confection_lfm_quantityE`,


--  Staffel / stk
    -1 AS `_pricing_endprices_graduated_with_confection_stk_quantityA`,
    -1 AS `_pricing_endprices_graduated_with_confection_stk_quantityB`,
    -1 AS `_pricing_endprices_graduated_with_confection_stk_quantityC`,
    -1 AS `_pricing_endprices_graduated_with_confection_stk_quantityD`,
    -1 AS `_pricing_endprices_graduated_with_confection_stk_quantityE`,



-- Maschinenauslastung->Stunden -- machine utilization->hours
    16 AS `_pricing_machine_utilization_hours_quantity_yearly`,
    17 AS `_pricing_machine_utilization_hours_quantityA`,
    18 AS `_pricing_machine_utilization_hours_quantityB`,
    19 AS `_pricing_machine_utilization_hours_quantityC`,
    20 AS `_pricing_machine_utilization_hours_quantityD`,
    21 AS `_pricing_machine_utilization_hours_quantityE`,


-- Maschinenauslastung->Tage -- machine utilization->days
    22 AS `_pricing_machine_utilization_days_quantity_yearly`,
    23 AS `_pricing_machine_utilization_days_quantityA`,
    24 AS `_pricing_machine_utilization_days_quantityB`,
    25 AS `_pricing_machine_utilization_days_quantityC`,
    26 AS `_pricing_machine_utilization_days_quantityD`,
    27 AS `_pricing_machine_utilization_days_quantityE`,


-- Maschinenauslastung->Wochen -- machine utilization->weeks
    -1 AS `_pricing_machine_utilization_weeks_quantity_yearly`,
    -1 AS `_pricing_machine_utilization_weeks_quantityA`,
    -1 AS `_pricing_machine_utilization_weeks_quantityB`,
    -1 AS `_pricing_machine_utilization_weeks_quantityC`,
    -1 AS `_pricing_machine_utilization_weeks_quantityD`,
    -1 AS `_pricing_machine_utilization_weeks_quantityE`,


-- Maschinenauslastung->Monate -- machine utilization->months
    -1 AS `_pricing_machine_utilization_months_quantity_yearly`,
    -1 AS `_pricing_machine_utilization_months_quantityA`,
    -1 AS `_pricing_machine_utilization_months_quantityB`,
    -1 AS `_pricing_machine_utilization_months_quantityC`,
    -1 AS `_pricing_machine_utilization_months_quantityD`,
    -1 AS `_pricing_machine_utilization_months_quantityE`,


-- Maschinenauslastung->Maschinenauslastung im Jahr prozentual -- machine utilization per year relative
    -1 AS `_pricing_machine_utilization_yearly_relative`,


-- Stück-Längen-Preise Staffel/m -- piece-length-prices graduated lfm
    -1 AS `_pricing_piece_length_prices_graduated_lfm_quantityA`,
    -1 AS `_pricing_piece_length_prices_graduated_lfm_quantityB`,
    -1 AS `_pricing_piece_length_prices_graduated_lfm_quantityC`,
    -1 AS `_pricing_piece_length_prices_graduated_lfm_quantityD`,
    -1 AS `_pricing_piece_length_prices_graduated_lfm_quantityE`,
   
-- Stück-Längen-Preise Länge 625mm -- piece-length-prices length 625mm  
    -1 AS `_pricing_piece_length_prices_length625_quantityA`,
    -1 AS `_pricing_piece_length_prices_length625_quantityB`,
    -1 AS `_pricing_piece_length_prices_length625_quantityC`,
    -1 AS `_pricing_piece_length_prices_length625_quantityD`,
    -1 AS `_pricing_piece_length_prices_length625_quantityE`,
   
-- Stück-Längen-Preise Länge 1000mm -- piece-length-prices length 1000mm    
    -1 AS `_pricing_piece_length_prices_length1000_quantityA`,
    -1 AS `_pricing_piece_length_prices_length1000_quantityB`,
    -1 AS `_pricing_piece_length_prices_length1000_quantityC`,
    -1 AS `_pricing_piece_length_prices_length1000_quantityD`,
    -1 AS `_pricing_piece_length_prices_length1000_quantityE`,
   
-- Stück-Längen-Preise Länge 1250mm -- piece-length-prices length 1250mm    
    -1 AS `_pricing_piece_length_prices_length1250_quantityA`,
    -1 AS `_pricing_piece_length_prices_length1250_quantityB`,
    -1 AS `_pricing_piece_length_prices_length1250_quantityC`,
    -1 AS `_pricing_piece_length_prices_length1250_quantityD`,
    -1 AS `_pricing_piece_length_prices_length1250_quantityE`,
   
-- Stück-Längen-Preise Länge 1333mm -- piece-length-prices length 1333mm    
    -1 AS `_pricing_piece_length_prices_length1333_quantityA`,
    -1 AS `_pricing_piece_length_prices_length1333_quantityB`,
    -1 AS `_pricing_piece_length_prices_length1333_quantityC`,
    -1 AS `_pricing_piece_length_prices_length1333_quantityD`,
    -1 AS `_pricing_piece_length_prices_length1333_quantityE`



  FROM offers_calculated_temp2 oc
SQL
    );
  }

  public function down(): void
  {
    DB::statement('DROP VIEW IF EXISTS offers_calculated');
  }
}
