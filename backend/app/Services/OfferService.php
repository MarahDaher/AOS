<?php

namespace App\Services;

use App\Models\Offer;
use App\Repositories\OfferRepository;

class OfferService
{
    public function __construct(private OfferRepository $repository) {}

    public function getAllSummary()
    {
        return $this->repository->getAllSummarized();
    }

    public function getOfferById(int $id): Offer
    {
        return $this->repository->getOfferById($id);
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

        return $this->repository->updateSingleField($offer, $field, $value);
    }

    private function allowedFields(): array
    {
        return [
            'general_offer_number',
            'general_status',
            'general_profile_description',
            'general_color',
            'general_material',
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
            'general_comments',
        ];
    }
}
