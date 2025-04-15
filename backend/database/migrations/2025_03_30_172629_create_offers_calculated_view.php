<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOffersCalculatedView extends Migration
{
  public function up(): void
  {
    DB::statement(<<<SQL
CREATE OR REPLACE VIEW offers_calculated AS 
  (SELECT 
    o.*, 

    (
      ROUND(o.`calculation_processing_lfm_runtime` * o.`calculation_processing_lfm_runtime_factor` + 
      o.`calculation_processing_lfm_packing_time` * o.`calculation_processing_lfm_packing_time_factor` ,2) 
    ) AS `_calculation_processing_lfm_expense`,
    (
      ROUND((o.`calculation_processing_lfm_runtime` * o.`calculation_processing_lfm_runtime_factor` + 
      o.`calculation_processing_lfm_packing_time` * o.`calculation_processing_lfm_packing_time_factor`) *
      o.`calculation_processing_lfm_hourly_rate` / 3600 ,2)
    ) AS `_calculation_processing_lfm_costs`,


    (
      ROUND(o.`calculation_processing_piece_runtime` * o.`calculation_processing_piece_runtime_factor` + 
      o.`calculation_processing_piece_packing_time` * o.`calculation_processing_piece_packing_time_factor` ,2)
    ) AS `_calculation_processing_piece_expense`,
    (
      ROUND((o.`calculation_processing_piece_runtime` * o.`calculation_processing_piece_runtime_factor` + 
      o.`calculation_processing_piece_packing_time` * o.`calculation_processing_piece_packing_time_factor`) *
       o.`calculation_processing_piece_hourly_rate` / 3600 ,2)
    ) AS `_calculation_processing_piece_costs`,


    (
      ROUND(o.`calculation_additional_setup_time` * o.`calculation_additional_hourly_rate`,2)
    ) AS `_calculation_additional_setup_costs_total`,
    (
      ROUND(o.`calculation_additional_setup_time` * o.`calculation_additional_hourly_rate` / 
      o.`calculation_quantityA`,2)
    ) AS `_calculation_additional_setup_costs_lfm`,
    (
      ROUND(o.`calculation_additional_transport_costs_total` / o.`calculation_quantityA`,2)
    ) AS `_calculation_additional_transport_costs_lfm`,
    (
      ROUND(((o.`calculation_additional_box_count` * o.`calculation_additional_box_price_per_piece`) + 
      o.`calculation_additional_box_price_flat_additional`) / o.`calculation_quantityA`,2)
    ) AS `_calculation_additional_box_costs_lfm`,
    (
      ROUND((o.`calculation_additional_single_print` * o.`calculation_additional_single_print_price`),2)
    ) AS `_calculation_additional_single_print_lfm`,


    (
      ROUND(o.`calculation_working_setup_quantity_relative` * o.`calculation_quantityA` / 100 , 2)
    ) AS `_calculation_working_setup_quantity_lfm`,
    (
      ROUND((o.`calculation_working_setup_quantity_relative` * o.`calculation_quantityA` / 100) / 
      o.`calculation_working_extrusion_speed` , 2)
    ) AS `_calculation_working_setup_time`,
    (
      ROUND(o.`calculation_working_tool_costs_customer` / o.`calculation_working_tool_costs_total` * 100 , 2)
    ) AS `_calculation_working_tool_costs_customer_relative`,
    (
      ROUND(
        (o.`calculation_working_allocation_costs_additional` +
        o.`calculation_working_tool_costs_total` -
        o.`calculation_working_tool_costs_customer`) /
        (o.`calculation_working_annual_requirement_estimated` * 
        o.`calculation_working_tool_costs_amortization_years`)
         , 2)
    ) AS `_calculation_working_allocation_costs_lfm`,

-- raw_material average density over the raw_materials pultiplied by their share
-- it has to be sumed up, because of the multiplication with the share. So its not directly the average.
    (
      SELECT SUM(r.density * o_r.share/100)
      FROM offers_raw_materials o_r 
      JOIN raw_materials r ON (r.id=o_r.raw_material_id)
      WHERE (o.id=o_r.offer_id)
    ) AS `_calculation_working_density_total`, 
    
-- _calculation_working_density_total * o.general_profile_crosssection * 
-- (100 - o.calculation_working_profile_cross_section_deviation_lower)/100
    (
      (
      SELECT SUM(r.density * o_r.share/100)
      FROM offers_raw_materials o_r 
      JOIN raw_materials r ON (r.id=o_r.raw_material_id)
      WHERE (o.id=o_r.offer_id)
    ) 
      * o.general_profile_crosssection 
      * (100 - o.calculation_working_profile_cross_section_deviation_lower)/100
    ) AS `_calculation_working_profile_weight_lowerborder`,

-- _calculation_working_density_total * general_profile_crosssection
    ((
      SELECT SUM(r.density * o_r.share/100)
      FROM offers_raw_materials o_r 
      JOIN raw_materials r ON (r.id=o_r.raw_material_id)
      WHERE (o.id=o_r.offer_id)
    )  * general_profile_crosssection ) AS `_calculation_working_profile_weight_average`,


-- _calculation_working_density_total * o.general_profile_crosssection * 
-- (100 + o.calculation_working_profile_cross_section_deviation_upper)/100
    (
      (
      SELECT SUM(r.density * o_r.share/100)
      FROM offers_raw_materials o_r 
      JOIN raw_materials r ON (r.id=o_r.raw_material_id)
      WHERE (o.id=o_r.offer_id)
    ) 
      * o.general_profile_crosssection 
      * (100 + o.calculation_working_profile_cross_section_deviation_upper)/100
    ) AS `_calculation_working_profile_weight_upperborder`,

-- , Jahresumsatz = AVG(Marge1-Meterpreis, Marge2-Meterpreis) * Jahresbedarf (o.`pricing_annual_requirement`)    ^
    0 AS `_pricing_requirement_annual_sales`,

-- , zus.Einstellmenge (for Kalk-Menge) / o.calculation_working_extrusion_speed /  60 
    ( ROUND(
      (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      / o. `calculation_working_extrusion_speed` / 60 
     , 2)) AS `_pricing_costs_calc_production_time`,

-- , `production_time` * o.calculation_processing_lfm_hourly_rate
    ( 
      ROUND(
      (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      / o. `calculation_working_extrusion_speed` / 60 
      
      * o.calculation_processing_lfm_hourly_rate
     , 2)) AS `_pricing_costs_calc_time_costs_quantity`,

-- , `time_costs_for_calc_quantity`/ zus.Einstellmenge (for Kalk-Menge) * o.`pricing_annual_requirement`
-- zeitkosten / kalkulationsmenge-zzgl * Jahresbedarf
     ( ROUND(
      (
        (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
        / o. `calculation_working_extrusion_speed` / 60 
        * o.calculation_processing_lfm_hourly_rate
      )   
     / (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
     * (o.`calculation_working_annual_requirement_estimated`)

    , 2)) AS `_pricing_costs_yearly_time_costs_quantity`,

-- `_calculation_working_profile_weight_average` / 1000 * kalkulationsmenge-zzgl
    ( ROUND(
        (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
        / 1000
        * 
        (
          (
            SELECT SUM(r.density * o_r.share/100)
            FROM offers_raw_materials o_r 
            JOIN raw_materials r ON (r.id=o_r.raw_material_id)
            WHERE (o.id=o_r.offer_id)
          )  * general_profile_crosssection 
        )
    , 2)) AS `_pricing_costs_calc_raw_material_quantity`,

-- Einstellmenge [kg] = Rohstoffmenge [kg] * Einstellmenge [%]
--       = _pricing_costs_calc_raw_material_quantity * calculation_working_setup_quantity_relative
    (
      ROUND(
      (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
        / 1000
        * 
        (
          (
            SELECT SUM(r.density * o_r.share/100)
            FROM offers_raw_materials o_r 
            JOIN raw_materials r ON (r.id=o_r.raw_material_id)
            WHERE (o.id=o_r.offer_id)
          )  * general_profile_crosssection 
        ) 
      * calculation_working_setup_quantity_relative
      /100
    , 2)) AS `_pricing_costs_calc_raw_material_setup_quantity`,

-- 	Einstellmenge [kg] + Rohstoffmenge [kg]
--  _pricing_costs_calc_raw_material_quantity + _pricing_costs_calc_raw_material_setup_quantity
    (
      ROUND(
      (
        (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
        / 1000
        * 
        (
          (
            SELECT SUM(r.density * o_r.share/100)
            FROM offers_raw_materials o_r 
            JOIN raw_materials r ON (r.id=o_r.raw_material_id)
            WHERE (o.id=o_r.offer_id)
          )  * general_profile_crosssection 
        )
      )
      +
      (  
        (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
        / 1000
        * 
        (
          (
            SELECT SUM(r.density * o_r.share/100)
            FROM offers_raw_materials o_r 
            JOIN raw_materials r ON (r.id=o_r.raw_material_id)
            WHERE (o.id=o_r.offer_id)
          )  * general_profile_crosssection 
        ) 
        * calculation_working_setup_quantity_relative
        /100
      )
    , 2)) AS `_pricing_costs_calc_raw_material_quantity_total`,

--  Rohstoffpreis gesamt [€] = "Rohstoffpreis / kg" * "Rohstoffmenge ges"
--  general_raw_material_price_total_overwritten * _pricing_costs_calc_raw_material_quantity_total
    ( ROUND(
      (
        (
          (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
          / 1000
          * 
          (
            (
              SELECT SUM(r.density * o_r.share/100)
              FROM offers_raw_materials o_r 
              JOIN raw_materials r ON (r.id=o_r.raw_material_id)
              WHERE (o.id=o_r.offer_id)
            )  * general_profile_crosssection 
          )
        )
        +
        (  
          (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100)
          / 1000
          * 
          (
            (
              SELECT SUM(r.density * o_r.share/100)
              FROM offers_raw_materials o_r 
              JOIN raw_materials r ON (r.id=o_r.raw_material_id)
              WHERE (o.id=o_r.offer_id)
            )  * general_profile_crosssection 
          ) 
          * calculation_working_setup_quantity_relative
          /100
        )
      ) * o.`general_raw_material_price_total_overwritten`
    , 2)) AS `_pricing_costs_calc_raw_material_price_total`,

--  Rohstoffeinsatz [€]    
-- Rohstoffpreis/m = ProfilgewichtAverage * general_raw_material_price_total_overwritten / 1000
-- _pricing_costs_yearly_raw_material_quantity = Rohstoffpreis/m * calculation_working_annual_requirement_estimated
    ( ROUND(
      (
        ((
          SELECT SUM(r.density * o_r.share/100)
          FROM offers_raw_materials o_r 
          JOIN raw_materials r ON (r.id=o_r.raw_material_id)
          WHERE (o.id=o_r.offer_id)
        )  * general_profile_crosssection )
        *
        o.`general_raw_material_price_total_overwritten`
        / 1000
      )
      * o.`calculation_working_annual_requirement_estimated`
    ,2 )) AS `_pricing_costs_yearly_raw_material_quantity`,

--  Fixkosten [€] ToDo: Erst Jahresumsatz berechnen Jahresumsatz-Rohstoffeinsatz-Zeitkosten
    0 AS `_pricing_costs_yearly_fixcosts`,

--  Zusatzpreis / m [€] = `pricing_costs_calc_price_additional_lfm` * calculation_quantityA
    ROUND(
      o.`pricing_costs_calc_price_additional_lfm` * o.`calculation_quantityA`
    ,2 ) AS `_pricing_endprices_calc_price_additional_lfm_total`,

--  Verpackung = _calculation_additional_box_costs_lfm * calculation_quantityA
    ( ROUND(
      (
        ((o.`calculation_additional_box_count` * o.`calculation_additional_box_price_per_piece`) + 
        o.`calculation_additional_box_price_flat_additional`) / o.`calculation_quantityA`
      )
      * o.`calculation_quantityA`
    ,2 )) AS `_pricing_endprices_calc_packing_costs`,

--  Transport = _calculation_additional_transport_costs_lfm * calculation_quantityA
    ( ROUND (
      (o.`calculation_additional_transport_costs_total` / o.`calculation_quantityA`)
      * o.`calculation_quantityA`
    ,2 )) AS `_pricing_endprices_calc_transport_costs`,

--  Druck = _calculation_additional_single_print_lfm * calculation_quantityA
    ( ROUND(
      (o.`calculation_additional_single_print` * o.`calculation_additional_single_print_price`)
      * o.`calculation_quantityA`
    ,2 )) AS `_pricing_endprices_calc_print_costs`,

--  Konfektion / m = _calculation_processing_lfm_costs * calculation_quantityA
    ( ROUND(
      (
        (o.`calculation_processing_lfm_runtime` * o.`calculation_processing_lfm_runtime_factor` + 
        o.`calculation_processing_lfm_packing_time` * o.`calculation_processing_lfm_packing_time_factor`) *
        o.`calculation_processing_lfm_hourly_rate` / 3600
      )
      * o.`calculation_quantityA`
    ,2 )) AS `_pricing_endprices_calc_confection_lfm_costs`,

--  Konfektion / stk = _calculation_processing_piece_costs * calculation_quantityA * Aufmachung / 1000
    ( ROUND(
      (
        (o.`calculation_processing_piece_runtime` * o.`calculation_processing_piece_runtime_factor` + 
        o.`calculation_processing_piece_packing_time` * o.`calculation_processing_piece_packing_time_factor`) *
        o.`calculation_processing_piece_hourly_rate` / 3600
      )
      * o.`calculation_quantityA` * o.`general_packaging` / 1000
    ,2 )) AS `_pricing_endprices_calc_confection_stk_costs`,

--  Summe
    0 AS `_pricing_endprices_calc_sum`,

--  Staffel / m
    0 AS `_pricing_endprices_graduated_without_confection_lfm_quantityA`,
    0 AS `_pricing_endprices_graduated_without_confection_lfm_quantityB`,
    0 AS `_pricing_endprices_graduated_without_confection_lfm_quantityC`,
    0 AS `_pricing_endprices_graduated_without_confection_lfm_quantityD`,
    0 AS `_pricing_endprices_graduated_without_confection_lfm_quantityE`,

--  Staffel / stk
    0 AS `_pricing_endprices_graduated_without_confection_stk_quantityA`,
    0 AS `_pricing_endprices_graduated_without_confection_stk_quantityB`,
    0 AS `_pricing_endprices_graduated_without_confection_stk_quantityC`,
    0 AS `_pricing_endprices_graduated_without_confection_stk_quantityD`,
    0 AS `_pricing_endprices_graduated_without_confection_stk_quantityE`,

--  Stück
    0 AS `_pricing_endprices_graduated_pieces_quantityA`,
    0 AS `_pricing_endprices_graduated_pieces_quantityB`,
    0 AS `_pricing_endprices_graduated_pieces_quantityC`,
    0 AS `_pricing_endprices_graduated_pieces_quantityD`,
    0 AS `_pricing_endprices_graduated_pieces_quantityE`,

--  Staffel / m
    0 AS `_pricing_endprices_graduated_with_confection_lfm_quantityA`,
    0 AS `_pricing_endprices_graduated_with_confection_lfm_quantityB`,
    0 AS `_pricing_endprices_graduated_with_confection_lfm_quantityC`,
    0 AS `_pricing_endprices_graduated_with_confection_lfm_quantityD`,
    0 AS `_pricing_endprices_graduated_with_confection_lfm_quantityE`,

--  Staffel / stk
    0 AS `_pricing_endprices_graduated_with_confection_stk_quantityA`,
    0 AS `_pricing_endprices_graduated_with_confection_stk_quantityB`,
    0 AS `_pricing_endprices_graduated_with_confection_stk_quantityC`,
    0 AS `_pricing_endprices_graduated_with_confection_stk_quantityD`,
    0 AS `_pricing_endprices_graduated_with_confection_stk_quantityE`,

--  Staffelpreise Mengen -- graduated prices quantities plus additonal setup quantity
    (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      AS `_pricing_graduated_calculation_quantityA`, 

    (o.`calculation_quantityB` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      AS `_pricing_graduated_calculation_quantityB`, 

    (o.`calculation_quantityC` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      AS `_pricing_graduated_calculation_quantityC`, 

    (o.`calculation_quantityD` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      AS `_pricing_graduated_calculation_quantityD`, 

    (o.`calculation_quantityE` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) 
      AS `_pricing_graduated_calculation_quantityE`,

--  Staffelpreise Stundensatz -- graduated prices hourly rates
    o.`calculation_working_hourly_rate` 
      AS `_pricing_graduated_calculation_hourly_rate_quantityA`,

    (o.`calculation_working_hourly_rate` * (100 + o.pricing_grad_qtyB_add_hourlyrate)/100)
      AS `_pricing_graduated_calculation_hourly_rate_quantityB`,

    (o.`calculation_working_hourly_rate` * (100 + o.pricing_grad_qtyC_add_hourlyrate)/100)
      AS `_pricing_graduated_calculation_hourly_rate_quantityC`,

    (o.`calculation_working_hourly_rate` * (100 + o.pricing_grad_qtyD_add_hourlyrate)/100)
      AS `_pricing_graduated_calculation_hourly_rate_quantityD`,

    (o.`calculation_working_hourly_rate` * (100 + o.pricing_grad_qtyE_add_hourlyrate)/100)
      AS `_pricing_graduated_calculation_hourly_rate_quantityE`,

--  Staffelpreise Zeitkostenanteil -- graduated prices time costs relative
--  TODO: check if it is right to take the calculated quantites where the setup quantites were added
    (o.`calculation_quantityA` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) / o.calculation_working_extrusion_speed / 60 
      AS `_pricing_graduated_calculation_timecosts_relative_quantityA`, 

    (o.`calculation_quantityB` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) / o.calculation_working_extrusion_speed / 60 
      AS `_pricing_graduated_calculation_timecosts_relative_quantityB`, 

    (o.`calculation_quantityC` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) / o.calculation_working_extrusion_speed / 60 
      AS `_pricing_graduated_calculation_timecosts_relative_quantityC`,

    (o.`calculation_quantityD` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) / o.calculation_working_extrusion_speed / 60 
      AS `_pricing_graduated_calculation_timecosts_relative_quantityD`, 

    (o.`calculation_quantityE` * (100 + o.pricing_graduated_calculation_additional_setup_quantity)/100) / o.calculation_working_extrusion_speed / 60 
      AS `_pricing_graduated_calculation_timecosts_relative_quantityE`,

--  Staffelpreise Produktionszeit -- graduated prices productiontime
    0 AS `_pricing_graduated_calculation_productiontime_quantityA`, 
    0 AS `_pricing_graduated_calculation_productiontime_quantityB`, 
    0 AS `_pricing_graduated_calculation_productiontime_quantityC`, 
    0 AS `_pricing_graduated_calculation_productiontime_quantityD`, 
    0 AS `_pricing_graduated_calculation_productiontime_quantityE`,

--  Staffelpreise Rohstoffmengen -- graduated prices raw material quantities
--  (Profilgewicht / 1000 * calcMenge ) + (Profilgewicht/1000*calcMenge*Einstellmenge/100)
--    (_calculation_working_profile_weight_average / 1000 * _pricing_graduated_calculation_quantityA) +
--    (_calculation_working_profile_weight_average / 1000 * _pricing_graduated_calculation_quantityA*calculation_working_setup_quantity_relative/100) 

    0 AS `_pricing_graduated_calculation_rawmaterialquantity_quantityA`, 
    0 AS `_pricing_graduated_calculation_rawmaterialquantity_quantityB`, 
    0 AS `_pricing_graduated_calculation_rawmaterialquantity_quantityC`, 
    0 AS `_pricing_graduated_calculation_rawmaterialquantity_quantityD`, 
    0 AS `_pricing_graduated_calculation_rawmaterialquantity_quantityE`,

--  Staffelpreise Zwischensummen -- graduated prices subtotals
    0 AS `_pricing_graduated_calculation_subtotal_quantityA`, 
    0 AS `_pricing_graduated_calculation_subtotal_quantityB`, 
    0 AS `_pricing_graduated_calculation_subtotal_quantityC`, 
    0 AS `_pricing_graduated_calculation_subtotal_quantityD`, 
    0 AS `_pricing_graduated_calculation_subtotal_quantityE`,

--  Staffelpreise Zwischensummen / m -- graduated prices subtotals lfm
    0 AS `_pricing_graduated_calculation_subtotal_lfm_quantityA`, 
    0 AS `_pricing_graduated_calculation_subtotal_lfm_quantityB`, 
    0 AS `_pricing_graduated_calculation_subtotal_lfm_quantityC`, 
    0 AS `_pricing_graduated_calculation_subtotal_lfm_quantityD`, 
    0 AS `_pricing_graduated_calculation_subtotal_lfm_quantityE`,

-- Maschinenauslastung->Stunden -- machine utilization->hours
    0 AS `_pricing_machine_utilization_hours_quantity_yearly`, 
    0 AS `_pricing_machine_utilization_hours_quantityA`, 
    0 AS `_pricing_machine_utilization_hours_quantityB`, 
    0 AS `_pricing_machine_utilization_hours_quantityC`, 
    0 AS `_pricing_machine_utilization_hours_quantityD`, 
    0 AS `_pricing_machine_utilization_hours_quantityE`,

-- Maschinenauslastung->Tage -- machine utilization->days
    0 AS `_pricing_machine_utilization_days_quantity_yearly`, 
    0 AS `_pricing_machine_utilization_days_quantityA`, 
    0 AS `_pricing_machine_utilization_days_quantityB`, 
    0 AS `_pricing_machine_utilization_days_quantityC`, 
    0 AS `_pricing_machine_utilization_days_quantityD`, 
    0 AS `_pricing_machine_utilization_days_quantityE`,

-- Maschinenauslastung->Wochen -- machine utilization->weeks
    0 AS `_pricing_machine_utilization_weeks_quantity_yearly`, 
    0 AS `_pricing_machine_utilization_weeks_quantityA`, 
    0 AS `_pricing_machine_utilization_weeks_quantityB`, 
    0 AS `_pricing_machine_utilization_weeks_quantityC`, 
    0 AS `_pricing_machine_utilization_weeks_quantityD`, 
    0 AS `_pricing_machine_utilization_weeks_quantityE`,

-- Maschinenauslastung->Monate -- machine utilization->months
    0 AS `_pricing_machine_utilization_months_quantity_yearly`, 
    0 AS `_pricing_machine_utilization_months_quantityA`, 
    0 AS `_pricing_machine_utilization_months_quantityB`, 
    0 AS `_pricing_machine_utilization_months_quantityC`, 
    0 AS `_pricing_machine_utilization_months_quantityD`, 
    0 AS `_pricing_machine_utilization_months_quantityE`,

-- Maschinenauslastung->Maschinenauslastung im Jahr prozentual -- machine utilization per year relative
    0 AS `_pricing_machine_utilization_yearly_relative`,

-- Stück-Längen-Preise Staffel/m -- piece-length-prices graduated lfm
    0 AS `_pricing_piece_length_prices_graduated_lfm_quantityA`, 
    0 AS `_pricing_piece_length_prices_graduated_lfm_quantityB`, 
    0 AS `_pricing_piece_length_prices_graduated_lfm_quantityC`, 
    0 AS `_pricing_piece_length_prices_graduated_lfm_quantityD`, 
    0 AS `_pricing_piece_length_prices_graduated_lfm_quantityE`,
    
-- Stück-Längen-Preise Länge 625mm -- piece-length-prices length 625mm  
    0 AS `_pricing_piece_length_prices_length625_quantityA`, 
    0 AS `_pricing_piece_length_prices_length625_quantityB`, 
    0 AS `_pricing_piece_length_prices_length625_quantityC`, 
    0 AS `_pricing_piece_length_prices_length625_quantityD`, 
    0 AS `_pricing_piece_length_prices_length625_quantityE`,
    
-- Stück-Längen-Preise Länge 1000mm -- piece-length-prices length 1000mm    
    0 AS `_pricing_piece_length_prices_length1000_quantityA`, 
    0 AS `_pricing_piece_length_prices_length1000_quantityB`, 
    0 AS `_pricing_piece_length_prices_length1000_quantityC`, 
    0 AS `_pricing_piece_length_prices_length1000_quantityD`, 
    0 AS `_pricing_piece_length_prices_length1000_quantityE`,
    
-- Stück-Längen-Preise Länge 1250mm -- piece-length-prices length 1250mm    
    0 AS `_pricing_piece_length_prices_length1250_quantityA`, 
    0 AS `_pricing_piece_length_prices_length1250_quantityB`, 
    0 AS `_pricing_piece_length_prices_length1250_quantityC`, 
    0 AS `_pricing_piece_length_prices_length1250_quantityD`, 
    0 AS `_pricing_piece_length_prices_length1250_quantityE`,
    
-- Stück-Längen-Preise Länge 1333mm -- piece-length-prices length 1333mm    
    0 AS `_pricing_piece_length_prices_length1333_quantityA`, 
    0 AS `_pricing_piece_length_prices_length1333_quantityB`, 
    0 AS `_pricing_piece_length_prices_length1333_quantityC`, 
    0 AS `_pricing_piece_length_prices_length1333_quantityD`, 
    0 AS `_pricing_piece_length_prices_length1333_quantityE`,

    (o.`runningcard_hourlyrecording_construction` + o.`runningcard_hourlyrecording_toolwork` + o.`runningcard_hourlyrecording_entry`) AS `_runningcard_hourlyrecording_total`

  FROM offers o
);
SQL);
  }

  public function down(): void
  {
    DB::statement('DROP VIEW IF EXISTS offers_calculated');
  }
}
