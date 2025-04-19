<?php

namespace App\Services;

use App\Config\RoleConstants;
use App\Models\Offer;
use App\Models\OfferCalculated;
use App\Models\User;
use App\Repositories\OfferRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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

    public function duplicateOffer(int $id)
    {
        $offer = $this->repository->getOfferById($id);

        if (!$offer) {
            throw new ModelNotFoundException('Offer not found.');
        }

        $newOffer = $this->repository->duplicate($offer);

        return $newOffer;
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
        return OfferCalculated::allowedFields();
    }

    public function editableFieldsByRoleAndStatus(User $user, Offer $offer): array
    {
        $role = $user->getRoleNames()->first();
        $status = $offer->general_status;

        $allSalesFields = [
            'general_offer_number',
            'general_status',
            'general_profile_crosssection',
            'general_profile_description',
            'general_color',
            'general_packaging',
            'general_article_number',
            'general_tool_number',
            'general_delivery_type',
            'general_order_number',
            'general_customer',
            'general_customer_contact_person',
            'general_customer_article_number',
            'general_request_date',
            'general_request_number',

            // raw material fields
            'raw_material_id',
            'supplier',
            'share',
            'price',
            'price_date',
            'type',
            'general_raw_material_purchase_discount',
            'general_raw_material_price_total_overwritten',

            //Additives
            'dosage_percent',
            'additives_price_sum',

        ];

        if ($role === RoleConstants::ADMIN_ROLE) {
            return $allSalesFields;
        }

        if ($role === RoleConstants::SALES_ROLE) {
            if (in_array($status, [null, 'Vorkalkulation'])) {
                return $allSalesFields;
            }

            if ($status === 'Angebot') {
                return ['general_status', 'general_order_number'];
            }

            if (in_array($status, ['Auftrag', 'Produziert'])) {
                return ['general_status'];
            }

            if ($status === 'Versandt') {
                return [];
            }
        }

        if ($role === RoleConstants::PRODUCTION_ROLE) {
            if ($status === 'Versandt') {
                return [];
            }

            // You can add editable fields for production if needed
        }

        return [];
    }
}
