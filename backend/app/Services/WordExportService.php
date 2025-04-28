<?php

namespace App\Services;

use PhpOffice\PhpWord\TemplateProcessor;

class WordExportService
{

    public function exportOfferWithTemplate(array $data, string $outputFilename)
    {
        $templatePath = storage_path('app/templates/Angebot Vorlage AOS.docx');
        $template = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);

        // Main fields from your images
        $template->setValue('general_offer_number', $data['general_offer_number'] ?? '-');
        $template->setValue('general_request_number', $data['general_request_number'] ?? '-');
        $template->setValue('general_customer', $data['general_customer'] ?? '-');
        $template->setValue('general_customer_contact_person', $data['general_customer_contact_person'] ?? '-');
        $template->setValue('general_profile_description', $data['general_profile_description'] ?? '-');
        $template->setValue('calculation_working_annual_requirement_estimated', $data['calculation_working_annual_requirement_estimated'] ?? '-');
        $template->setValue('_ingredients_concatenated', $data['_ingredients_concatenated'] ?? '-');
        $template->setValue('general_color', $data['general_color'] ?? '-');
        $template->setValue('general_customer_article_number', $data['general_customer_article_number'] ?? '-');
        $template->setValue('general_packaging', $data['general_packaging'] ?? '-');
        $template->setValue('calculation_quantityA', $data['calculation_quantityA'] ?? '-');
        $template->setValue('calculation_working_discount', $data['calculation_working_discount'] ?? '-');
        $template->setValue('general_comments', $data['general_comments'] ?? '');
        $template->setValue('calculation_working_tool_costs_customer', $data['calculation_working_tool_costs_customer'] ?? '-');

        // Example: if you have pricing fields like in quantity table
        $template->setValue('calculation_quantityB', $data['calculation_quantityB'] ?? '-');
        $template->setValue('calculation_quantityC', $data['calculation_quantityC'] ?? '-');
        $template->setValue('calculation_quantityD', $data['calculation_quantityD'] ?? '-');
        $template->setValue('calculation_quantityE', $data['calculation_quantityE'] ?? '-');

        $template->setValue('_pricing_endprices_graduated_with_confection_lfm_quantityA', $data['_pricing_endprices_graduated_with_confection_lfm_quantityA'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_lfm_quantityB', $data['_pricing_endprices_graduated_with_confection_lfm_quantityB'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_lfm_quantityC', $data['_pricing_endprices_graduated_with_confection_lfm_quantityC'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_lfm_quantityD', $data['_pricing_endprices_graduated_with_confection_lfm_quantityD'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_lfm_quantityE', $data['_pricing_endprices_graduated_with_confection_lfm_quantityE'] ?? '-');

        //
        $template->setValue('_pricing_endprices_graduated_with_confection_stk_quantityA', $data['_pricing_endprices_graduated_with_confection_stk_quantityA'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_stk_quantityB', $data['_pricing_endprices_graduated_with_confection_stk_quantityB'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_stk_quantityC', $data['_pricing_endprices_graduated_with_confection_stk_quantityC'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_stk_quantityD', $data['_pricing_endprices_graduated_with_confection_stk_quantityD'] ?? '-');
        $template->setValue('_pricing_endprices_graduated_with_confection_stk_quantityE', $data['_pricing_endprices_graduated_with_confection_stk_quantityE'] ?? '-');

        // 
        $template->setValue('calculation_working_tool_costs_customer', $data['calculation_working_tool_costs_customer'] ?? '-');
        $template->setValue('calculation_working_discount', $data['calculation_working_discount'] ?? '-');

        // ✅ Now add the TODAY() placeholder replacement
        $template->setValue('TODAY()', now()->format('d.m.Y'));
        //
        $outputPath = storage_path("app/public/{$outputFilename}.docx");
        $template->saveAs($outputPath);

        return response()->download($outputPath)->deleteFileAfterSend();
    }
}
