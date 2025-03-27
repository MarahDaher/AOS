<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'general_status',
        'general_offer_number',
        'general_material',
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
        'general_raw_materialA_id',
        'general_raw_materialB_id',
        'general_raw_materialC_id',
        'general_raw_materialD_id',
        'general_raw_materialA_supplier',
        'general_raw_materialB_supplier',
        'general_raw_materialC_supplier',
        'general_raw_materialD_supplier',
        'general_raw_materialA_share',
        'general_raw_materialB_share',
        'general_raw_materialC_share',
        'general_raw_materialD_share',
        'general_raw_material_price_total_overwritten',
        'general_raw_material_purchase_discount',
        'general_comments',
        'calculation_quantityA',
        'calculation_quantityB',
        'calculation_quantityC',
        'calculation_quantityD',
        'calculation_quantityE',
        'calculation_rawmaterialA_absolute_demand',
        'calculation_rawmaterialB_absolute_demand',
        'calculation_rawmaterialC_absolute_demand',
        'calculation_rawmaterialD_absolute_demand',
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
        'calculation_additional_setup_time',
        'calculation_additional_hourly_rate',
        'calculation_additional_transport_costs_total',
        'calculation_additional_box_count',
        'calculation_additional_box_price_per_piece',
        'calculation_additional_box_price_flat_additional',
        'calculation_additional_single_print',
        'calculation_additional_single_print_price',
        'calculation_working_setup_quantity',
        'calculation_working_extrusion_speed',
        'calculation_working_annual_requirement_estimated',
        'calculation_working_tool_costs_total',
        'calculation_working_tool_costs_customer',
        'calculation_working_tool_costs_amortization_years',
        'calculation_working_allocation_costs_additional',
        'calculation_working_profile_cross_section',
        'calculation_working_profile_cross_section_deviation_lower',
        'calculation_working_profile_cross_section_deviation_upper',
        'calculation_working_setup_quantity_additional',
        'calculation_working_hourly_rate',
        'calculation_working_additional_costs',
        'calculation_working_commission',
        'calculation_working_profit',
        'calculation_working_discount'

    ];

    public function rawMaterialA()
    {
        return $this->belongsTo(RawMaterial::class, 'general_raw_materialA_id');
    }

    public function rawMaterialB()
    {
        return $this->belongsTo(RawMaterial::class, 'general_raw_materialB_id');
    }

    public function rawMaterialC()
    {
        return $this->belongsTo(RawMaterial::class, 'general_raw_materialC_id');
    }

    public function rawMaterialD()
    {
        return $this->belongsTo(RawMaterial::class, 'general_raw_materialD_id');
    }
}
