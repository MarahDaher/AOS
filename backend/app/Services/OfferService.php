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
        return OfferCalculated::with(['createdByUser', 'status'])->findOrFail($id);
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
            'general_status_id' => 1,
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
        $role = strtolower($user->getRoleNames()->first());
        $statusName = $offer->status?->name;

        $allFields = $this->allowedFields();
        $statuses = config('offer_statuses.statuses');
        $editableRules = config('offer_statuses.editable_fields');

        // Admin
        if ($editableRules[$role] === 'ALL') {
            return $allFields;
        }

        // If no status (new offer), treat as VORKALKULATION
        if (!$statusName) {
            $statusKey = 'VORKALKULATION';
        } else {
            // Find the status key (example: 'VORKALKULATION', 'AUFTRAG')
            $statusKey = array_search($statusName, $statuses, true);
        }

        // If no matching statusKey found
        if (!$statusKey) {
            return [];
        }

        $roleRules = $editableRules[$role] ?? [];

        // Handle production DEFAULT case
        if ($role === 'production' && !isset($roleRules[$statusKey])) {
            return $roleRules['DEFAULT'] === 'ALL' ? $allFields : $roleRules['DEFAULT'];
        }

        // Normal cases
        $fields = $roleRules[$statusKey] ?? [];

        return $fields === 'ALL' ? $allFields : $fields;
    }
}
