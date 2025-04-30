<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Models\Offer;
use App\Models\OfferCalculated;
use App\Models\OfferCalculatedWordExport;
use App\Services\WordExportService;

class OfferExportController extends BaseController
{
    protected $wordExportService;

    public function __construct(WordExportService $wordExportService)
    {
        $this->wordExportService = $wordExportService;
    }

    public function export($id)
    {
        $offer = OfferCalculatedWordExport::findOrFail($id);

        // Convert model to associative array
        $data = $offer->toArray();

        // Optionally format keys to match placeholder names
        $placeholders = [];
        foreach ($data as $key => $value) {
            $placeholders[$key] = $value ?? '-';
        }

        $filename = 'Offer_' . ($offer->general_offer_number ?? 'DEFAULT');

        return $this->wordExportService->exportOfferWithTemplate($placeholders, $filename);
    }
}
