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

        $data = [
            'general_offer_number' => $offer->general_offer_number ?? 'AN-DEFAULT',
            'general_request_number' => $offer->general_request_number ?? 'RQ-DEFAULT',
            'general_customer' => $offer->general_customer ?? 'Default Company',
            'general_customer_contact_person' => $offer->general_customer_contact_person ?? 'Default Contact',
            'general_profile_description' => $offer->general_profile_description ?? 'Vierkantprofil',
            'calculation_working_annual_requirement_estimated' => $offer->calculation_working_annual_requirement_estimated ?? '0',
            '_ingredients_concatenated' => $offer->_ingredients_concatenated ?? 'Material Info',
            'general_color' => $offer->general_color ?? 'red',
            'general_customer_article_number' => $offer->general_customer_article_number ?? 'ART-000',
            'general_packaging' => $offer->general_packaging ?? 'Default Packaging',
            'calculation_quantityA' => $offer->calculation_quantityA ?? '-',
            'calculation_quantityB' => $offer->calculation_quantityB ?? '-',
            'calculation_quantityC' => $offer->calculation_quantityC ?? '-',
            'calculation_quantityD' => $offer->calculation_quantityD ?? '-',
            'calculation_quantityE' => $offer->calculation_quantityE ?? '-',
            ///
            '_pricing_endprices_graduated_with_confection_lfm_quantityA' => $offer->_pricing_endprices_graduated_with_confection_lfm_quantityA ?? "-",
            '_pricing_endprices_graduated_with_confection_lfm_quantityB' => $offer->_pricing_endprices_graduated_with_confection_lfm_quantityB ?? "-",
            '_pricing_endprices_graduated_with_confection_lfm_quantityC' => $offer->_pricing_endprices_graduated_with_confection_lfm_quantityC ?? "-",
            '_pricing_endprices_graduated_with_confection_lfm_quantityD' => $offer->_pricing_endprices_graduated_with_confection_lfm_quantityD ?? "-",
            '_pricing_endprices_graduated_with_confection_lfm_quantityE' => $offer->_pricing_endprices_graduated_with_confection_lfm_quantityE ?? "-",
            //
            '_pricing_endprices_graduated_with_confection_stk_quantityA' => $offer->_pricing_endprices_graduated_with_confection_stk_quantityA ?? "-",
            '_pricing_endprices_graduated_with_confection_stk_quantityB' => $offer->_pricing_endprices_graduated_with_confection_stk_quantityB ?? "-",
            '_pricing_endprices_graduated_with_confection_stk_quantityC' => $offer->_pricing_endprices_graduated_with_confection_stk_quantityC ?? "-",
            '_pricing_endprices_graduated_with_confection_stk_quantityD' => $offer->_pricing_endprices_graduated_with_confection_stk_quantityD ?? "-",
            '_pricing_endprices_graduated_with_confection_stk_quantityE' => $offer->_pricing_endprices_graduated_with_confection_stk_quantityE ?? "-",
            //
            'calculation_working_tool_costs_customer' => $offer->calculation_working_tool_costs_customer ?? '-',
            'calculation_working_discount' => $offer->calculation_working_discount ?? '-',
            'general_comments' => $offer->general_comments ?? '-',
        ];

        $filename = 'Offer_' . ($offer->general_offer_number ?? 'DEFAULT');

        return $this->wordExportService->exportOfferWithTemplate($data, $filename);
    }
}
