<?php

namespace App\Services;

use App\Models\Offer;
use App\Models\OfferCalculated;
use App\Repositories\OfferRepository;
use Illuminate\Support\Str;

class OfferService
{
    public function __construct(private OfferRepository $repository) {}

    public function getAllSummary()
    {
        return $this->repository->getAllSummarized();
    }

    public function getOfferById(int $id): OfferCalculated
    {
        return OfferCalculated::with('createdByUser')->findOrFail($id);
    }


    public function createOfferFromField(string $field, mixed $value, int $userId): Offer
    {
        $allowedFields = $this->allowedFields();

        if (!in_array($field, $allowedFields)) {
            throw new \InvalidArgumentException('Invalid field: ' . $field);
        }

        $data = [
            $field => $value,
            'general_created_by_user_id' => $userId,
            'general_creation_date' => now(),
        ];

        return $this->repository->createOffer($data);
    }

    public function updateField(Offer $offer, string $field, mixed $value): Offer
    {
        $allowedFields = $this->allowedFields();

        if (!in_array($field, $allowedFields)) {
            throw new \InvalidArgumentException('Invalid field: ' . $field);
        }

        // Handle date formatting for date fields
        if (Str::endsWith($field, '_date') && !empty($value)) {
            $value = date('Y-m-d', strtotime($value)); // Convert ISO to Y-m-d
        }

        return $this->repository->updateSingleField($offer, $field, $value);
    }

    private function allowedFields(): array
    {
        return [
            'general_offer_number',
            'general_status',
            'general_profile_description',
            'general_color',
            'general_packaging',
            'general_article_number',
            'general_tool_number',
            'general_order_number',
            'general_delivery_type',
            'general_customer',
            'general_customer_contact_person',
            'general_customer_article_number',
            'general_request_number',
            'general_request_date',
            'general_profile_crosssection',

            // raw material
            'general_raw_material_price_total_overwritten',
            'general_raw_material_purchase_discount',
            //
            'general_comments',

            // Calculation
            'calculation_quantityA',
            'calculation_quantityB',
            'calculation_quantityC',
            'calculation_quantityD',
            'calculation_quantityE',

            // ProcessingPerMeterCard
            "calculation_processing_lfm_hourly_rate",
            "calculation_processing_lfm_runtime",
            "calculation_processing_lfm_runtime_factor",
            "calculation_processing_lfm_packing_time",
            "calculation_processing_lfm_packing_time_factor",
            "_calculation_processing_lfm_expense",
            "_calculation_processing_lfm_costs",

            // ProcessingPerPieceCard
            "calculation_processing_piece_hourly_rate",
            "calculation_processing_piece_runtime",
            "calculation_processing_piece_runtime_factor",
            "calculation_processing_piece_packing_time",
            "calculation_processing_piece_packing_time_factor",
            "_calculation_processing_piece_expense",
            "_calculation_processing_piece_costs",

            // AdditionalPrintCard
            "calculation_additional_setup_time",
            "calculation_additional_hourly_rate",
            "calculation_additional_transport_costs_total",
            "calculation_additional_box_count",
            "calculation_additional_box_price_per_piece",
            "calculation_additional_box_price_flat_additional",
            "calculation_additional_single_print",
            "calculation_additional_single_print_price",
            "_calculation_additional_setup_costs_total",
            "_calculation_additional_setup_costs_lfm",
            "_calculation_additional_transport_costs_lfm",
            "_calculation_additional_box_costs_lfm",
            "_calculation_additional_single_print_lfm",

            // Working
            "calculation_working_setup_quantity_relative",
            "calculation_working_extrusion_speed",
            "_calculation_working_setup_quantity_lfm",
            "_calculation_working_setup_time",
            "calculation_working_annual_requirement_estimated",

            "calculation_working_tool_costs_total",
            "calculation_working_tool_costs_customer",
            "calculation_working_allocation_costs_additional",
            "calculation_working_tool_costs_amortization_years",
            "_calculation_working_allocation_costs_lfm",

            "calculation_working_profile_cross_section",
            "calculation_working_profile_cross_section_deviation_lower",
            "calculation_working_profile_cross_section_deviation_upper",
            "_calculation_working_density_total",
            "_calculation_working_profile_weight_lowerborder",
            "_calculation_working_profile_weight_average",
            "_calculation_working_profile_weight_upperborder",

            "calculation_working_setup_quantity_additional",
            "calculation_working_hourly_rate",
            "calculation_working_additional_costs",

            "calculation_working_commission",
            "calculation_working_profit",
            "calculation_working_discount",

            //-----------------
            "_pricing_production_time",
            "_pricing_time_costs_for_calc_quantity"
        ];
    }
}
