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

        // Remove everything before <body> and after </body>
        $bodyStart = strpos($html, '<body>');
        $bodyEnd = strpos($html, '</body>');

        if ($bodyStart !== false && $bodyEnd !== false) {
            $bodyContent = substr($html, $bodyStart + 6, $bodyEnd - $bodyStart - 6); // Only inside <body>...</body>
        } else {
            $bodyContent = $html; // fallback if somehow no body found
        }

        $filename = 'Offer_' . $offer->general_offer_number;

        return $this->wordExportService->exportHtmlToWord($bodyContent, $filename);
    }
}
