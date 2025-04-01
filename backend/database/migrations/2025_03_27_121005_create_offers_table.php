<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();

            // General Info
            $table->enum('general_status', ['Vorkalkulation', 'Angebot', 'Auftrag', 'Produziert', 'Versandt'])->nullable();
            $table->string('general_offer_number', 63)->nullable();
            $table->string('general_material', 63)->nullable();
            $table->integer('general_profile_description')->nullable();
            $table->dateTime('general_creation_date')->nullable();
            $table->foreignId('general_created_by_user_id')->constrained('users');
            $table->string('general_color', 31)->nullable();
            $table->integer('general_packaging')->nullable();
            $table->string('general_tool_number', 31)->nullable();
            $table->string('general_order_number', 31)->nullable();
            $table->enum('general_delivery_type', ['frei', 'unfrei'])->nullable();
            $table->string('general_article_number', 63)->nullable();
            $table->string('general_customer', 63)->nullable();
            $table->string('general_customer_contact_person', 63)->nullable();
            $table->string('general_customer_article_number', 31)->nullable();
            $table->date('general_request_date')->nullable();
            $table->integer('general_request_number')->nullable();

            //Raw material
            $table->float('general_raw_material_price_total_overwritten')->nullable();
            $table->float('general_raw_material_purchase_discount')->nullable();
            $table->text('general_comments')->nullable();

            // Quantities
            foreach (['A', 'B', 'C', 'D', 'E'] as $key) {
                $table->integer("calculation_quantity{$key}")->nullable();
            }


            // foreach (['A', 'B', 'C', 'D'] as $key) {
            //     $table->integer("calculation_rawmaterial{$key}_absolute_demand")->nullable();
            // }

            // Processing
            $table->float('calculation_processing_lfm_hourly_rate')->nullable();
            $table->float('calculation_processing_piece_hourly_rate')->nullable();
            $table->float('calculation_processing_lfm_runtime')->nullable();
            $table->float('calculation_processing_piece_runtime')->nullable();
            $table->integer('calculation_processing_lfm_runtime_factor')->nullable();
            $table->integer('calculation_processing_piece_runtime_factor')->nullable();
            $table->float('calculation_processing_lfm_packing_time')->nullable();
            $table->float('calculation_processing_piece_packing_time')->nullable();
            $table->integer('calculation_processing_lfm_packing_time_factor')->nullable();
            $table->integer('calculation_processing_piece_packing_time_factor')->nullable();

            // Additional
            $table->integer('calculation_additional_setup_time')->nullable();
            $table->float('calculation_additional_hourly_rate')->nullable();
            $table->float('calculation_additional_transport_costs_total')->nullable();
            $table->integer('calculation_additional_box_count')->nullable();
            $table->float('calculation_additional_box_price_per_piece')->nullable();
            $table->float('calculation_additional_box_price_flat_additional')->nullable();
            $table->float('calculation_additional_single_print')->nullable();
            $table->float('calculation_additional_single_print_price')->nullable();

            // Working
            $table->integer('calculation_working_setup_quantity')->nullable();
            $table->float('calculation_working_extrusion_speed')->nullable();
            $table->integer('calculation_working_annual_requirement_estimated')->nullable();
            $table->float('calculation_working_tool_costs_total')->nullable();
            $table->float('calculation_working_tool_costs_customer')->nullable();
            $table->integer('calculation_working_tool_costs_amortization_years')->nullable();
            $table->integer('calculation_working_allocation_costs_additional')->nullable();
            $table->float('calculation_working_profile_cross_section')->nullable();
            $table->integer('calculation_working_profile_cross_section_deviation_lower')->default(0);
            $table->integer('calculation_working_profile_cross_section_deviation_upper')->default(0);
            $table->integer('calculation_working_setup_quantity_additional')->nullable();
            $table->integer('calculation_working_hourly_rate')->nullable();
            $table->float('calculation_working_additional_costs')->nullable();
            $table->float('calculation_working_commission')->nullable();
            $table->float('calculation_working_profit')->nullable();
            $table->float('calculation_working_discount')->nullable();

            $table->integer('pricing_annual_requirement')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
