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
            o.*, 

            ROUND(
                COALESCE(o.calculation_processing_lfm_runtime, 0) * COALESCE(o.calculation_processing_lfm_runtime_factor, 0) +
                COALESCE(o.calculation_processing_lfm_packing_time, 0) * COALESCE(o.calculation_processing_lfm_packing_time_factor, 0), 
            2) AS _calculation_processing_lfm_expense,

            ROUND(
                (COALESCE(o.calculation_processing_lfm_runtime, 0) * COALESCE(o.calculation_processing_lfm_runtime_factor, 0) +
                 COALESCE(o.calculation_processing_lfm_packing_time, 0) * COALESCE(o.calculation_processing_lfm_packing_time_factor, 0)) *
                COALESCE(o.calculation_processing_lfm_hourly_rate, 0) / 3600, 
            2) AS _calculation_processing_lfm_costs,

            ROUND(
                COALESCE(o.calculation_processing_piece_runtime, 0) * COALESCE(o.calculation_processing_piece_runtime_factor, 0) +
                COALESCE(o.calculation_processing_piece_packing_time, 0) * COALESCE(o.calculation_processing_piece_packing_time_factor, 0), 
            2) AS _calculation_processing_piece_expense,

            ROUND(
                (COALESCE(o.calculation_processing_piece_runtime, 0) * COALESCE(o.calculation_processing_piece_runtime_factor, 0) +
                 COALESCE(o.calculation_processing_piece_packing_time, 0) * COALESCE(o.calculation_processing_piece_packing_time_factor, 0)) *
                COALESCE(o.calculation_processing_piece_hourly_rate, 0) / 3600, 
            2) AS _calculation_processing_piece_costs,

            ROUND(
                COALESCE(o.calculation_additional_setup_time, 0) * COALESCE(o.calculation_additional_hourly_rate, 0), 
            2) AS _calculation_additional_setup_costs_total,

            ROUND(
                COALESCE(o.calculation_additional_setup_time, 0) * COALESCE(o.calculation_additional_hourly_rate, 0) / 
                NULLIF(o.calculation_quantityA, 0), 
            2) AS _calculation_additional_setup_costs_lfm,

            ROUND(
                COALESCE(o.calculation_additional_transport_costs_total, 0) / 
                NULLIF(o.calculation_quantityA, 0), 
            2) AS _calculation_additional_transport_costs_lfm,

            ROUND(
                (COALESCE(o.calculation_additional_box_count, 0) * COALESCE(o.calculation_additional_box_price_per_piece, 0) +
                 COALESCE(o.calculation_additional_box_price_flat_additional, 0)) / 
                NULLIF(o.calculation_quantityA, 0), 
            2) AS _calculation_additional_box_costs_lfm,

            ROUND(
                COALESCE(o.calculation_additional_single_print, 0) * COALESCE(o.calculation_additional_single_print_price, 0), 
            2) AS _calculation_additional_single_print_lfm,

            ROUND(
                COALESCE(o.calculation_working_setup_quantity, 0) * COALESCE(o.calculation_quantityA, 0) / 100, 
            2) AS _calculation_working_setup_quantity_lfm,

            ROUND(
                (COALESCE(o.calculation_working_setup_quantity, 0) * COALESCE(o.calculation_quantityA, 0) / 100) / 
                NULLIF(o.calculation_working_extrusion_speed, 0), 
            2) AS _calculation_working_setup_time,

            ROUND(
                COALESCE(o.calculation_working_tool_costs_customer, 0) / 
                NULLIF(o.calculation_working_tool_costs_total, 0) * 100, 
            2) AS _calculation_working_tool_costs_customer_relative,

            ROUND(
                (COALESCE(o.calculation_working_allocation_costs_additional, 0) + COALESCE(o.calculation_working_tool_costs_total, 0) - 
                 COALESCE(o.calculation_working_tool_costs_customer, 0)) / 
                NULLIF(
                    COALESCE(o.calculation_working_annual_requirement_estimated, 0) *
                    COALESCE(o.calculation_working_tool_costs_amortization_years, 0), 
                0), 
            2) AS _calculation_working_allocation_costs_lfm,

            0 AS _calculation_working_density_total,
            0 AS _calculation_working_profile_weight_lowerborder,
            0 AS _calculation_working_profile_weight_average,
            0 AS _calculation_working_profile_weight_upperborder,
            0 AS _pricing_annual_sales,
            0 AS production_time,
            0 AS time_costs_for_calc_quantity,
            0 AS time_costs_for_yearly_quantity,
            0 AS _unused_field

        FROM offers o;
        SQL);
    }

    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS offers_calculated');
    }
};
