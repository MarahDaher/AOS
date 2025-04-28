<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Offer Word Export Mapping
    |--------------------------------------------------------------------------
    |
    | This array defines the placeholders in the Word template and their
    | corresponding fields from the OfferCalculated model.
    |
    */

    'template_path' => 'app/templates/Angebot Vorlage AOS.docx',


    'placeholders' => [
        'general_offer_number' => 'general_offer_number',
        'general_request_number' => 'general_request_number',
        'general_customer' => 'general_customer',
        'general_customer_contact_person' => 'general_customer_contact_person',
        'general_profile_description' => 'general_profile_description',
        'calculation_working_annual_requirement_estimated' => 'calculation_working_annual_requirement_estimated',
        '_ingredients_concatenated' => '_ingredients_concatenated',
        'general_color' => 'general_color',
        'general_customer_article_number' => 'general_customer_article_number',
        'general_packaging' => 'general_packaging',
        //
        'calculation_quantityA' => 'calculation_quantityA',
        'calculation_quantityB' => 'calculation_quantityB',
        'calculation_quantityC' => 'calculation_quantityC',
        'calculation_quantityD' => 'calculation_quantityD',
        'calculation_quantityE' => 'calculation_quantityE',

        '_pricing_endprices_graduated_with_confection_lfm_quantityA' => '_pricing_endprices_graduated_with_confection_lfm_quantityA',
        '_pricing_endprices_graduated_with_confection_lfm_quantityB' => '_pricing_endprices_graduated_with_confection_lfm_quantityB',
        '_pricing_endprices_graduated_with_confection_lfm_quantityC' => '_pricing_endprices_graduated_with_confection_lfm_quantityC',
        '_pricing_endprices_graduated_with_confection_lfm_quantityD' => '_pricing_endprices_graduated_with_confection_lfm_quantityD',
        '_pricing_endprices_graduated_with_confection_lfm_quantityE' => '_pricing_endprices_graduated_with_confection_lfm_quantityE',

        '_pricing_endprices_graduated_with_confection_stk_quantityA' => '_pricing_endprices_graduated_with_confection_stk_quantityA',
        '_pricing_endprices_graduated_with_confection_stk_quantityB' => '_pricing_endprices_graduated_with_confection_stk_quantityB',
        '_pricing_endprices_graduated_with_confection_stk_quantityC' => '_pricing_endprices_graduated_with_confection_stk_quantityC',
        '_pricing_endprices_graduated_with_confection_stk_quantityD' => '_pricing_endprices_graduated_with_confection_stk_quantityD',
        '_pricing_endprices_graduated_with_confection_stk_quantityE' => '_pricing_endprices_graduated_with_confection_stk_quantityE',

        'calculation_working_tool_costs_customer' => 'calculation_working_tool_costs_customer',
        'calculation_working_discount' => 'calculation_working_discount',
        'general_comments' => 'general_comments',
    ],

];
