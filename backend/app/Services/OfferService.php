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
        ];
    }
}
