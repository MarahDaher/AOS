<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;
use App\Models\Offer;
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
        $offer = Offer::findOrFail($id);

        $html = view('exports.offer', compact('offer'))->render();
        $filename = 'Offer_' . $offer->general_offer_number;

        // No need to manually extract body here anymore! ✅
        return $this->wordExportService->exportHtmlToWord($html, $filename);
    }
}
