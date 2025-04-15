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

        $data = [
            'company_name'     => $offer->customer_name ?? 'Default Company',
            // 'offer_number'     => $offer->general_offer_number ?? 'AN-DEFAULT',
            'profile_name'     => $offer->profile_name ?? 'Vierkantprofil',
            // 'price_per_meter'  => number_format($offer->price_per_meter, 2, ',', '.') ?? '0,00',
            // 'delivery_time'    => $offer->delivery_time ?? 'ca. 15 AT',
            'color'     => 'red',
        ];

        $filename = 'Offer_' . $offer->general_offer_number;

        return $this->wordExportService->exportOfferWithTemplate($data, $filename);
    }
}
