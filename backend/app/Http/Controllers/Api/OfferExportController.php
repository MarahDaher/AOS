<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Models\Offer;
use App\Models\OfferCalculated;
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
        $offer = OfferCalculated::findOrFail($id);

        $placeholders = config('offer_word_export.placeholders');

        $data = [];

        foreach ($placeholders as $templatePlaceholder => $modelField) {
            $data[$modelField] = $offer->{$modelField} ?? '';
        }

        $filename = 'Offer_' . ($offer->general_offer_number ?? 'DEFAULT');

        return $this->wordExportService->exportOfferWithTemplate($data, $filename);
    }
}
