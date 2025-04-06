<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
  public function up(): void
  {
    // 🛠 Create offers_raw_materials_calculated view
    DB::statement("
            CREATE OR REPLACE VIEW offers_raw_materials_calculated AS
            SELECT 
                r.name,
                r.type,
                r.density,
                o_r.offer_id,
                o_r.raw_material_id,
                o_r.absolut_demand,
                o_r.share,
                o_r.supplier,
                COALESCE(o_r.price, r.price) AS price,
                COALESCE(o_r.price_date, r.price_date) AS price_date,
                ROUND(r.price - (r.price * o.general_raw_material_purchase_discount / 100), 2) AS _price_minus_discount,
                ROUND((r.price * o_r.share / 100), 2) AS _price_share,
                ROUND((r.price - (r.price * o.general_raw_material_purchase_discount / 100)) * (o_r.share / 100), 2) AS _price_minus_discount_share
            FROM raw_materials r
            JOIN offers_raw_materials o_r ON r.id = o_r.raw_material_id
            JOIN offers o ON o.id = o_r.offer_id;
        ");

    // 🛠 Create offers_calculated view
    DB::statement("
            CREATE OR REPLACE VIEW offers_calculated AS
            SELECT 
                o.*,

                ROUND(o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor +
                      o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor, 2)
                  AS _calculation_processing_lfm_expense,

                ROUND((o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor +
                       o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor) *
                      o.calculation_processing_lfm_hourly_rate / 3600, 2)
                  AS _calculation_processing_lfm_costs,

                ROUND(o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor +
                      o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor, 2)
                  AS _calculation_processing_piece_expense,

                ROUND((o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor +
                       o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor) *
                      o.calculation_processing_piece_hourly_rate / 3600, 2)
                  AS _calculation_processing_piece_costs,

                ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate, 2)
                  AS _calculation_additional_setup_costs_total,

                ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate / o.calculation_quantityA, 2)
                  AS _calculation_additional_setup_costs_lfm,

                ROUND(o.calculation_additional_transport_costs_total / o.calculation_quantityA, 2)
                  AS _calculation_additional_transport_costs_lfm,

                ROUND((o.calculation_additional_box_count * o.calculation_additional_box_price_per_piece +
                       o.calculation_additional_box_price_flat_additional) / o.calculation_quantityA, 2)
                  AS _calculation_additional_box_costs_lfm,

                ROUND(o.calculation_additional_single_print * o.calculation_additional_single_print_price, 2)
                  AS _calculation_additional_single_print_lfm,

                ROUND(o.calculation_working_setup_quantity_relative * o.calculation_quantityA / 100, 2)
                  AS _calculation_working_setup_quantity_lfm,

                ROUND((o.calculation_working_setup_quantity_relative * o.calculation_quantityA / 100) /
                      o.calculation_working_extrusion_speed, 2)
                  AS _calculation_working_setup_time,

                ROUND(o.calculation_working_tool_costs_customer / o.calculation_working_tool_costs_total * 100, 2)
                  AS _calculation_working_tool_costs_customer_relative,

                ROUND((o.calculation_working_allocation_costs_additional + o.calculation_working_tool_costs_total - o.calculation_working_tool_costs_customer) /
                      (o.calculation_working_annual_requirement_estimated * o.calculation_working_tool_costs_amortization_years), 2)
                  AS _calculation_working_allocation_costs_lfm,


                -- Static 0 placeholders
                0 AS _calculation_working_density_total,
                0 AS _calculation_working_profile_weight_lowerborder,
                0 AS _calculation_working_profile_weight_average,
                0 AS _calculation_working_profile_weight_upperborder,

                0 AS _pricing_requirement_annual_sales,
                0 AS _pricing_costs_calc_production_time,
                0 AS _pricing_costs_calc_time_costs_quantity,
                0 AS _pricing_costs_yearly_time_costs_quantity,
                0 AS _pricing_costs_calc_raw_material_quantity,
                0 AS _pricing_costs_calc_raw_material_setup_quantity,
                0 AS _pricing_costs_calc_raw_material_quantity_total,
                0 AS _pricing_costs_calc_raw_material_price_total,
                0 AS _pricing_costs_yearly_raw_material_quantity,
                0 AS _pricing_costs_yearly_fixcosts,
                0 AS _pricing_costs_calc_price_additional_lfm,

                0 AS _pricing_endprices_calc_packing_costs,
                0 AS _pricing_endprices_calc_transport_costs,
                0 AS _pricing_endprices_calc_print_costs,
                0 AS _pricing_endprices_calc_confection_lfm_costs,
                0 AS _pricing_endprices_calc_confection_stk_costs,
                0 AS _pricing_endprices_calc_sum,

                0 AS _pricing_endprices_graduated_without_confection_lfm_quantityA,
                0 AS _pricing_endprices_graduated_without_confection_lfm_quantityB,
                0 AS _pricing_endprices_graduated_without_confection_lfm_quantityC,
                0 AS _pricing_endprices_graduated_without_confection_lfm_quantityD,
                0 AS _pricing_endprices_graduated_without_confection_lfm_quantityE,

                0 AS _pricing_endprices_graduated_without_confection_stk_quantityA,
                0 AS _pricing_endprices_graduated_without_confection_stk_quantityB,
                0 AS _pricing_endprices_graduated_without_confection_stk_quantityC,
                0 AS _pricing_endprices_graduated_without_confection_stk_quantityD,
                0 AS _pricing_endprices_graduated_without_confection_stk_quantityE,

                0 AS _pricing_endprices_graduated_with_confection_lfm_quantityA,
                0 AS _pricing_endprices_graduated_with_confection_lfm_quantityB,
                0 AS _pricing_endprices_graduated_with_confection_lfm_quantityC,
                0 AS _pricing_endprices_graduated_with_confection_lfm_quantityD,
                0 AS _pricing_endprices_graduated_with_confection_lfm_quantityE,

                0 AS _pricing_endprices_graduated_with_confection_stk_quantityA,
                0 AS _pricing_endprices_graduated_with_confection_stk_quantityB,
                0 AS _pricing_endprices_graduated_with_confection_stk_quantityC,
                0 AS _pricing_endprices_graduated_with_confection_stk_quantityD,
                0 AS _pricing_endprices_graduated_with_confection_stk_quantityE,

                0 AS _pricing_graduated_calculation_quantityA,
                0 AS _pricing_graduated_calculation_quantityB,
                0 AS _pricing_graduated_calculation_quantityC,
                0 AS _pricing_graduated_calculation_quantityD,
                0 AS _pricing_graduated_calculation_quantityE,

                0 AS _pricing_graduated_calculation_hourly_rate_quantityB,
                0 AS _pricing_graduated_calculation_hourly_rate_quantityC,
                0 AS _pricing_graduated_calculation_hourly_rate_quantityD,
                0 AS _pricing_graduated_calculation_hourly_rate_quantityE,

                0 AS _pricing_graduated_calculation_timecosts_relative_quantityA,
                0 AS _pricing_graduated_calculation_timecosts_relative_quantityB,
                0 AS _pricing_graduated_calculation_timecosts_relative_quantityC,
                0 AS _pricing_graduated_calculation_timecosts_relative_quantityD,
                0 AS _pricing_graduated_calculation_timecosts_relative_quantityE,

                0 AS _pricing_graduated_calculation_productiontime_quantityA,
                0 AS _pricing_graduated_calculation_productiontime_quantityB,
                0 AS _pricing_graduated_calculation_productiontime_quantityC,
                0 AS _pricing_graduated_calculation_productiontime_quantityD,
                0 AS _pricing_graduated_calculation_productiontime_quantityE,

                0 AS _pricing_graduated_calculation_rawmaterialquantity_quantityA,
                0 AS _pricing_graduated_calculation_rawmaterialquantity_quantityB,
                0 AS _pricing_graduated_calculation_rawmaterialquantity_quantityC,
                0 AS _pricing_graduated_calculation_rawmaterialquantity_quantityD,
                0 AS _pricing_graduated_calculation_rawmaterialquantity_quantityE,

                0 AS _pricing_graduated_calculation_subtotal_quantityA,
                0 AS _pricing_graduated_calculation_subtotal_quantityB,
                0 AS _pricing_graduated_calculation_subtotal_quantityC,
                0 AS _pricing_graduated_calculation_subtotal_quantityD,
                0 AS _pricing_graduated_calculation_subtotal_quantityE,

                0 AS _pricing_graduated_calculation_subtotal_lfm_quantityA,
                0 AS _pricing_graduated_calculation_subtotal_lfm_quantityB,
                0 AS _pricing_graduated_calculation_subtotal_lfm_quantityC,
                0 AS _pricing_graduated_calculation_subtotal_lfm_quantityD,
                0 AS _pricing_graduated_calculation_subtotal_lfm_quantityE,

                0 AS _pricing_machine_utilization_hours_quantity_yearly,
                0 AS _pricing_machine_utilization_hours_quantityA,
                0 AS _pricing_machine_utilization_hours_quantityB,
                0 AS _pricing_machine_utilization_hours_quantityC,
                0 AS _pricing_machine_utilization_hours_quantityD,
                0 AS _pricing_machine_utilization_hours_quantityE,

                0 AS _pricing_machine_utilization_days_quantity_yearly,
                0 AS _pricing_machine_utilization_days_quantityA,
                0 AS _pricing_machine_utilization_days_quantityB,
                0 AS _pricing_machine_utilization_days_quantityC,
                0 AS _pricing_machine_utilization_days_quantityD,
                0 AS _pricing_machine_utilization_days_quantityE,

                0 AS _pricing_machine_utilization_weeks_quantity_yearly,
                0 AS _pricing_machine_utilization_weeks_quantityA,
                0 AS _pricing_machine_utilization_weeks_quantityB,
                0 AS _pricing_machine_utilization_weeks_quantityC,
                0 AS _pricing_machine_utilization_weeks_quantityD,
                0 AS _pricing_machine_utilization_weeks_quantityE,

                0 AS _pricing_machine_utilization_months_quantity_yearly,
                0 AS _pricing_machine_utilization_months_quantityA,
                0 AS _pricing_machine_utilization_months_quantityB,
                0 AS _pricing_machine_utilization_months_quantityC,
                0 AS _pricing_machine_utilization_months_quantityD,
                0 AS _pricing_machine_utilization_months_quantityE,

                0 AS _pricing_machine_utilization_yearly_relative

            FROM offers o
        ");
  }

  public function down(): void
  {
    DB::statement('DROP VIEW IF EXISTS offers_raw_materials_calculated');
    DB::statement('DROP VIEW IF EXISTS offers_calculated');
  }
};
