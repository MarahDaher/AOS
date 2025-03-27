<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            CREATE OR REPLACE VIEW offers_calculated AS 
            SELECT 
                o.*,

                -- Total raw material demand
                (COALESCE(o.calculation_rawmaterialA_absolute_demand, 0) + 
                 COALESCE(o.calculation_rawmaterialB_absolute_demand, 0) + 
                 COALESCE(o.calculation_rawmaterialC_absolute_demand, 0) + 
                 COALESCE(o.calculation_rawmaterialD_absolute_demand, 0)
                ) AS _calculation_rawmaterial_demand_total,

                -- LFM Processing
                ROUND(o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor + 
                      o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor, 2
                ) AS _calculation_processing_lfm_expense,

                ROUND(
                    (o.calculation_processing_lfm_runtime * o.calculation_processing_lfm_runtime_factor + 
                     o.calculation_processing_lfm_packing_time * o.calculation_processing_lfm_packing_time_factor) *
                     o.calculation_processing_lfm_hourly_rate / 3600, 2
                ) AS _calculation_processing_lfm_costs,

                -- Piece Processing
                ROUND(o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor + 
                      o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor, 2
                ) AS _calculation_processing_piece_expense,

                ROUND(
                    (o.calculation_processing_piece_runtime * o.calculation_processing_piece_runtime_factor + 
                     o.calculation_processing_piece_packing_time * o.calculation_processing_piece_packing_time_factor) *
                     o.calculation_processing_piece_hourly_rate / 3600, 2
                ) AS _calculation_processing_piece_costs,

                -- Additional Setup & Transport
                ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate, 2)
                    AS _calculation_additional_setup_costs_total,

                ROUND(o.calculation_additional_setup_time * o.calculation_additional_hourly_rate / NULLIF(o.calculation_quantityA, 0), 2)
                    AS _calculation_additional_setup_costs_lfm,

                ROUND(o.calculation_additional_transport_costs_total / o.calculation_quantityA, 2)
                    AS _calculation_additional_transport_costs_lfm,

                ROUND(((o.calculation_additional_box_count * o.calculation_additional_box_price_per_piece) + 
                      o.calculation_additional_box_price_flat_additional) / o.calculation_quantityA, 2)
                    AS _calculation_additional_box_costs_lfm,

                ROUND((o.calculation_additional_single_print * o.calculation_additional_single_print_price), 2)
                    AS _calculation_additional_single_print_lfm,

                -- Working Section
                ROUND(o.calculation_working_setup_quantity * o.calculation_quantityA / 100, 2)
                    AS _calculation_working_setup_quantity_lfm,

                ROUND((o.calculation_working_setup_quantity * o.calculation_quantityA / 100) / 
                      o.calculation_working_extrusion_speed, 2)
                    AS _calculation_working_setup_time,

                ROUND(o.calculation_working_tool_costs_customer / o.calculation_working_tool_costs_total * 100, 2)
                    AS _calculation_working_tool_costs_customer_relative,

                ROUND(
                    (o.calculation_working_allocation_costs_additional +
                     o.calculation_working_tool_costs_total -
                     o.calculation_working_tool_costs_customer) /
                     (o.calculation_working_annual_requirement_estimated * 
                      o.calculation_working_tool_costs_amortization_years),
                    2
                ) AS _calculation_working_allocation_costs_lfm

            FROM offers o
        ");
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS offers_calculated");
    }
};
