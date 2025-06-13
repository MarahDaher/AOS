<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        // 🧹 General Info
        'general_status_id',
        'general_offer_number',
        'general_profile_description',
        'general_creation_date',
        'general_created_by_user_id',
        'general_color',
        'general_packaging',
        'general_tool_number',
        'general_order_number',
        'general_delivery_type',
        'general_article_number',
        'general_customer',
        'general_customer_contact_person',
        'general_customer_article_number',
        'general_request_date',
        'general_request_number',
        'general_profile_crosssection',
        'general_raw_material_price_total_overwritten',
        'general_raw_material_purchase_discount',
        'general_comments',

        // 🧹 Quantities
        'calculation_quantityA',
        'calculation_quantityB',
        'calculation_quantityC',
        'calculation_quantityD',
        'calculation_quantityE',

        // 🧹 Processing
        'calculation_processing_lfm_hourly_rate',
        'calculation_processing_piece_hourly_rate',
        'calculation_processing_lfm_runtime',
        'calculation_processing_piece_runtime',
        'calculation_processing_lfm_runtime_factor',
        'calculation_processing_piece_runtime_factor',
        'calculation_processing_lfm_packing_time',
        'calculation_processing_piece_packing_time',
        'calculation_processing_lfm_packing_time_factor',
        'calculation_processing_piece_packing_time_factor',

        // 🧹 Additional
        'calculation_additional_setup_time',
        'calculation_additional_hourly_rate',
        'calculation_additional_transport_costs_total',
        'calculation_additional_box_count',
        'calculation_additional_box_price_per_piece',
        'calculation_additional_box_price_flat_additional',
        'calculation_additional_single_print',
        'calculation_additional_single_print_price',

        // 🧹 Working
        'calculation_working_setup_quantity_relative',
        'calculation_working_extrusion_speed',
        'calculation_working_annual_requirement_estimated',
        'calculation_working_tool_costs_total',
        'calculation_working_tool_costs_customer',
        'calculation_working_tool_costs_amortization_years',
        'calculation_working_allocation_costs_additional',
        'calculation_working_profile_cross_section_deviation_lower',
        'calculation_working_profile_cross_section_deviation_upper',
        'calculation_working_setup_quantity_total',
        'calculation_working_hourly_rate',
        'calculation_working_additional_costs',
        'calculation_working_commission',
        'calculation_working_profit',
        'calculation_working_discount',
        // 'calculation_working_setup_quantity_additional',

        // 🧹 Pricing
        'pricing_annual_requirement',
        'pricing_graduated_calculation_additional_setup_quantity',
        'pricing_costs_calc_price_additional_lfm',
        'pricing_costs_calc_price_additional_lfm_desc',

        'pricing_grad_qtyA_add_hourlyrate',
        'pricing_grad_qtyB_add_hourlyrate',
        'pricing_grad_qtyC_add_hourlyrate',
        'pricing_grad_qtyD_add_hourlyrate',
        'pricing_grad_qtyE_add_hourlyrate',

        'pricing_grad_qtyB_add_setupcosts',
        'pricing_grad_qtyC_add_setupcosts',
        'pricing_grad_qtyD_add_setupcosts',
        'pricing_grad_qtyE_add_setupcosts',

        'pricing_grad_qtyB_add_transport',
        'pricing_grad_qtyC_add_transport',
        'pricing_grad_qtyD_add_transport',
        'pricing_grad_qtyE_add_transport',

        'pricing_machine_utilization_annual_machine_capacity',

        'pricing_piece_length_prices_length1',
        'pricing_piece_length_prices_length2',
        'pricing_piece_length_prices_length3',
        'pricing_piece_length_prices_length4',
        'pricing_piece_length_prices_length5',

        'runningcard_sampling_date',
        'runningcard_sampling_quantity',
        'runningcard_sampling_length',
        'runningcard_sampling_packing',
        'runningcard_sampling_indication',
        'runningcard_qualitity_indication',
        'runningcard_printing',
        'runningcard_packing_type',
        'runningcard_packing_variant',
        'runningcard_packing_length',
        'runningcard_packing_packing_unit',
        'runningcard_packing_quantity',
        'runningcard_packing_description',

        'runningcard_hourlyrecording_construction',
        'runningcard_hourlyrecording_toolwork',
        'runningcard_hourlyrecording_entry',
        'runningcard_hourlyrecording_entrystitches',
        'runningcard_hourlyrecording_entrydriver_user_id',
        'runningcard_hourlyrecording_toolmaker_user_id',

        'pricing_piece_length_prices_length1',
        'pricing_piece_length_prices_length2',
        'pricing_piece_length_prices_length3',
        'pricing_piece_length_prices_length4',
        'pricing_piece_length_prices_length5',

        'runningcard_extrusion_speed_IST',
        'runningcard_profile_weight_IST',

        'runningcard_tool_costs',
        'runningcard_tool_cost_type',
        'runningcard_tool_hint',
    ];

    protected $casts = [
        'general_creation_date' => 'datetime',
        'general_request_date' => 'date',
    ];

    // Relationships
    public function rawMaterials()
    {
        return $this->belongsToMany(RawMaterial::class, 'offers_raw_materials')
            ->withPivot('absolut_demand', 'share', 'supplier');
    }

    public function drawings()
    {
        return $this->hasMany(OfferDrawing::class);
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'general_created_by_user_id');
    }

    public function status()
    {
        return $this->belongsTo(OfferStatus::class, 'general_status_id');
    }
}
