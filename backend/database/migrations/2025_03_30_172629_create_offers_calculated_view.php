<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOffersCalculatedView extends Migration
{
    public function up(): void
    {
        DB::statement(<<<SQL
CREATE OR REPLACE VIEW offers_calculated AS 
(
  SELECT 
    o.*,

    -- ✅ Processing LFM
    ROUND(o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor + o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor, 2) AS _calculation_processing_lfm_expense,
    ROUND((o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor + o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor) * o.calculation_processing_lfm_hourly_rate / 3600, 2) AS _calculation_processing_lfm_costs,

    -- ✅ Processing Piece
    ROUND(o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor + o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor, 2) AS _calculation_processing_piece_expense,
    ROUND((o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor + o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor) * o.calculation_processing_piece_hourly_rate / 3600, 2) AS _calculation_processing_piece_costs,

    -- ✅ Additional Costs
    ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate, 2) AS _calculation_additional_setup_costs_total,
    ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate / o.calculation_quantityA, 2) AS _calculation_additional_setup_costs_lfm,
    ROUND(o.calculation_additional_transport_costs_total / o.calculation_quantityA, 2) AS _calculation_additional_transport_costs_lfm,
    ROUND(((o.calculation_additional_box_count * o.calculation_additional_box_price_per_piece) + o.calculation_additional_box_price_flat_additional) / o.calculation_quantityA, 2) AS _calculation_additional_box_costs_lfm,
    ROUND(o.calculation_additional_single_print * o.calculation_additional_single_print_price, 2) AS _calculation_additional_single_print_lfm,

    -- ✅ Working Calculations
    ROUND(o.calculation_working_setup_quantity_relative * o.calculation_quantityA / 100, 2) AS _calculation_working_setup_quantity_lfm,
    ROUND((o.calculation_working_setup_quantity_relative * o.calculation_quantityA / 100) / o.calculation_working_extrusion_speed, 2) AS _calculation_working_setup_time,
    ROUND(o.calculation_working_tool_costs_customer / o.calculation_working_tool_costs_total * 100, 2) AS _calculation_working_tool_costs_customer_relative,
    ROUND((o.calculation_working_allocation_costs_additional + o.calculation_working_tool_costs_total - o.calculation_working_tool_costs_customer) / (o.calculation_working_annual_requirement_estimated * o.calculation_working_tool_costs_amortization_years), 2) AS _calculation_working_allocation_costs_lfm,

    -- ✅ Densities from offers_raw_materials
    (SELECT SUM(r.density * o_r.share / 100)
     FROM offers_raw_materials o_r 
     JOIN raw_materials r ON r.id = o_r.raw_material_id
     WHERE o.id = o_r.offer_id
    ) AS _calculation_working_density_total,

    (SELECT SUM(r.density * o_r.share / 100)
     FROM offers_raw_materials o_r 
     JOIN raw_materials r ON r.id = o_r.raw_material_id
     WHERE o.id = o_r.offer_id
    ) * o.general_profile_crosssection * (100 - o.calculation_working_profile_cross_section_deviation_lower) / 100 AS _calculation_working_profile_weight_lowerborder,

    (SELECT SUM(r.density * o_r.share / 100)
     FROM offers_raw_materials o_r 
     JOIN raw_materials r ON r.id = o_r.raw_material_id
     WHERE o.id = o_r.offer_id
    ) * o.general_profile_crosssection AS _calculation_working_profile_weight_average,

    (SELECT SUM(r.density * o_r.share / 100)
     FROM offers_raw_materials o_r 
     JOIN raw_materials r ON r.id = o_r.raw_material_id
     WHERE o.id = o_r.offer_id
    ) * o.general_profile_crosssection * (100 + o.calculation_working_profile_cross_section_deviation_upper) / 100 AS _calculation_working_profile_weight_upperborder,

    0 AS _pricing_requirement_annual_sales,

    -- ✅ Pricing Calculations
    ROUND((o.calculation_quantityA * (100 + o.pricing_graduated_calculation_additional_setup_quantity) / 100) / o.calculation_working_extrusion_speed / 60, 2) AS _pricing_costs_calc_production_time,
    ROUND(((o.calculation_quantityA * (100 + o.pricing_graduated_calculation_additional_setup_quantity) / 100) / o.calculation_working_extrusion_speed / 60) * o.calculation_processing_lfm_hourly_rate, 2) AS _pricing_costs_calc_time_costs_quantity,

    -- ✅ Raw Material Calculations
    ROUND(((o.calculation_quantityA * (100 + o.pricing_graduated_calculation_additional_setup_quantity) / 100) / 1000 * 
      (SELECT SUM(r.density * o_r.share / 100)
       FROM offers_raw_materials o_r 
       JOIN raw_materials r ON r.id = o_r.raw_material_id
       WHERE o.id = o_r.offer_id) * o.general_profile_crosssection), 2) AS _pricing_costs_calc_raw_material_quantity,

    -- ✅ Many fields prefilled with 0 for future calculation
    0 AS _pricing_costs_yearly_time_costs_quantity,
    0 AS _pricing_costs_calc_raw_material_setup_quantity,
    0 AS _pricing_costs_calc_raw_material_quantity_total,
    0 AS _pricing_costs_calc_raw_material_price_total,
    0 AS _pricing_costs_yearly_raw_material_quantity,
    0 AS _pricing_costs_yearly_fixcosts,
    0 AS _pricing_endprices_calc_price_additional_lfm_total,
    0 AS _pricing_endprices_calc_packing_costs,
    0 AS _pricing_endprices_calc_transport_costs,
    0 AS _pricing_endprices_calc_print_costs,
    0 AS _pricing_endprices_calc_confection_lfm_costs,
    0 AS _pricing_endprices_calc_confection_stk_costs,
    0 AS _pricing_endprices_calc_sum,

    (o.calculation_quantityA * (100 + o.pricing_graduated_calculation_additional_setup_quantity) / 100) AS _pricing_graduated_calculation_quantityA,

    (o.runningcard_hourlyrecording_construction + o.runningcard_hourlyrecording_toolwork + o.runningcard_hourlyrecording_entry) AS _runningcard_hourlyrecording_total

  FROM offers o
);
SQL);
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS offers_calculated');
    }
}
