<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->set('general_status', ['Vorkalkulation', 'Angebot', 'Auftrag', 'Produziert', 'Versandt'])->nullable();
            $table->string('general_offer_number', 63)->nullable();
            // $table->string('general_material', 63)->nullable(); // deprecated
            $table->integer('general_profile_description')->nullable();
            $table->dateTime('general_creation_date');
            $table->foreignId('general_created_by_user_id')->constrained('users');
            $table->string('general_color', 31)->nullable();
            $table->integer('general_packaging')->nullable();
            $table->string('general_tool_number', 31)->nullable();
            $table->string('general_order_number', 31)->nullable();
            $table->set('general_delivery_type', ['frei', 'unfrei'])->nullable();
            $table->string('general_article_number', 63)->nullable();
            $table->string('general_customer', 63)->nullable();
            $table->string('general_customer_contact_person', 63)->nullable();
            $table->string('general_customer_article_number', 31)->nullable();
            $table->date('general_request_date')->nullable();
            $table->integer('general_request_number')->nullable();
            $table->float('general_profile_crosssection')->nullable();
            $table->float('general_raw_material_price_total_overwritten')->nullable();
            $table->float('general_raw_material_purchase_discount')->nullable();
            $table->text('general_comments')->nullable();

            $table->integer('calculation_quantityA')->nullable();
            $table->integer('calculation_quantityB')->nullable();
            $table->integer('calculation_quantityC')->nullable();
            $table->integer('calculation_quantityD')->nullable();
            $table->integer('calculation_quantityE')->nullable();

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

            $table->integer('calculation_additional_setup_time')->nullable();
            $table->float('calculation_additional_hourly_rate')->nullable();
            $table->float('calculation_additional_transport_costs_total')->nullable();
            $table->integer('calculation_additional_box_count')->nullable();
            $table->float('calculation_additional_box_price_per_piece')->nullable();
            $table->float('calculation_additional_box_price_flat_additional')->nullable();
            $table->float('calculation_additional_single_print')->nullable();
            $table->float('calculation_additional_single_print_price')->nullable();

            $table->integer('calculation_working_setup_quantity_relative')->nullable();
            $table->float('runningcard_extrusion_speed_IST')->nullable();
            $table->integer('calculation_working_annual_requirement_estimated')->nullable();
            $table->float('calculation_working_tool_costs_total')->nullable();
            $table->float('calculation_working_tool_costs_customer')->nullable();
            $table->integer('calculation_working_tool_costs_amortization_years')->nullable();
            $table->integer('calculation_working_allocation_costs_additional')->nullable();
            $table->float('calculation_working_profile_cross_section')->nullable();
            $table->integer('calculation_working_profile_cross_section_deviation_lower')->default(0);
            $table->integer('calculation_working_profile_cross_section_deviation_upper')->default(0);
            $table->integer('calculation_working_setup_quantity_total')->nullable();
            $table->integer('calculation_working_hourly_rate')->nullable();

            $table->integer('calculation_working_setup_quantity_additional')->nullable();
            $table->float('calculation_working_additional_costs')->nullable();
            $table->float('calculation_working_commission')->nullable();
            $table->float('calculation_working_profit')->nullable();
            $table->float('calculation_working_discount')->nullable();

            $table->integer('pricing_annual_requirement')->default(0);
            $table->integer('pricing_graduated_calculation_additional_setup_quantity')->default(0);

            // 🛠️ Additional pricing fields (fixing missing types)
            $table->float('pricing_grad_qtyB_add_hourlyrate')->nullable();
            $table->float('pricing_grad_qtyC_add_hourlyrate')->nullable();
            $table->float('pricing_grad_qtyD_add_hourlyrate')->nullable();
            $table->float('pricing_grad_qtyE_add_hourlyrate')->nullable();

            $table->float('pricing_grad_qtyB_add_setupcosts')->nullable();
            $table->float('pricing_grad_qtyC_add_setupcosts')->nullable();
            $table->float('pricing_grad_qtyD_add_setupcosts')->nullable();
            $table->float('pricing_grad_qtyE_add_setupcosts')->nullable();

            $table->float('pricing_grad_qtyB_add_transport')->nullable();
            $table->float('pricing_grad_qtyC_add_transport')->nullable();
            $table->float('pricing_grad_qtyD_add_transport')->nullable();
            $table->float('pricing_grad_qtyE_add_transport')->nullable();

            $table->float('pricing_machine_utilization_annual_machine_capacity')->nullable();

            $table->date('runningcard_sampling_date')->nullable();
            $table->integer('runningcard_sampling_quantity')->nullable();
            $table->integer('runningcard_sampling_length')->nullable();
            $table->integer('runningcard_sampling_packing')->nullable();
            $table->string('runningcard_sampling_indication', 31)->nullable();
            $table->text('runningcard_qualitity_indication')->nullable();
            $table->text('runningcard_printing')->nullable();
            $table->string('runningcard_packing_type', 31)->nullable();
            $table->string('runningcard_packing_variant', 31)->nullable();
            $table->integer('runningcard_packing_length')->nullable();
            $table->integer('runningcard_packing_packing_unit')->nullable();
            $table->integer('runningcard_packing_quantity')->nullable();
            $table->text('runningcard_packing_description')->nullable();

            $table->integer('runningcard_hourlyrecording_construction')->nullable();
            $table->integer('runningcard_hourlyrecording_toolwork')->nullable();
            $table->integer('runningcard_hourlyrecording_entry')->nullable();
            $table->integer('runningcard_hourlyrecording_entrystitches')->nullable();
            $table->foreignId('runningcard_hourlyrecording_entrydriver_user_id')->nullable()->constrained('users');
            $table->foreignId('runningcard_hourlyrecording_toolmaker_user_id')->nullable()->constrained('users');

            $table->integer('runningcard_tool_costs')->nullable();
            $table->string('runningcard_tool_cost_type', 31)->nullable();
            $table->text('runningcard_tool_hint')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
