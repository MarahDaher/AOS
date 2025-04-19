export const mapOfferDetailsToFinalPriceData = (offerDetails: any) => {
  const calculation = {
    _pricing_costs_calc_time_costs_quantity:
      offerDetails._pricing_costs_calc_time_costs_quantity || 0,
    _pricing_costs_calc_raw_material_price_total:
      offerDetails._pricing_costs_calc_raw_material_price_total || 0,
    _calculation_additional_setup_costs_total:
      offerDetails._calculation_additional_setup_costs_total || 0,
    _pricing_endprices_calc_packing_costs:
      offerDetails._pricing_endprices_calc_packing_costs || 0,
    _pricing_endprices_calc_transport_costs:
      offerDetails._pricing_endprices_calc_transport_costs || 0,
    _pricing_endprices_calc_print_costs:
      offerDetails._pricing_endprices_calc_print_costs || 0,
    _pricing_endprices_calc_confection_lfm_costs:
      offerDetails._pricing_endprices_calc_confection_lfm_costs || 0,
    _pricing_endprices_calc_confection_stk_costs:
      offerDetails._pricing_endprices_calc_confection_stk_costs || 0,
    _pricing_endprices_calc_price_additional_lfm_total:
      offerDetails._pricing_endprices_calc_price_additional_lfm_total || 0,
    calculation_working_commission:
      offerDetails.calculation_working_commission || 0,
    calculation_working_profit: offerDetails.calculation_working_profit || 0,
    calculation_working_discount:
      offerDetails.calculation_working_discount || 0,
    _pricing_endprices_calc_sum: offerDetails._pricing_endprices_calc_sum || 0,
  };

  const staffelpreise = [
    {
      staffel: "A",
      menge: offerDetails.calculation_quantityA || 0,
      staffel_m:
        offerDetails._pricing_endprices_graduated_without_confection_lfm_quantityA ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_without_confection_stk_quantityA ||
        0,
      stueck:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityA ||
        0,
    },
    {
      staffel: "B",
      menge: offerDetails.calculation_quantityB || 0,
      staffel_m:
        offerDetails._pricing_endprices_graduated_without_confection_lfm_quantityB ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_without_confection_stk_quantityB ||
        0,
      stueck:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityB ||
        0,
    },
    {
      staffel: "C",
      menge: offerDetails.calculation_quantityC || 0,
      staffel_m:
        offerDetails._pricing_endprices_graduated_without_confection_lfm_quantityC ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_without_confection_stk_quantityC ||
        0,
      stueck:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityC ||
        0,
    },
    {
      staffel: "D",
      menge: offerDetails.calculation_quantityD || 0,
      staffel_m:
        offerDetails._pricing_endprices_graduated_without_confection_lfm_quantityD ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_without_confection_stk_quantityD ||
        0,
      stueck:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityD ||
        0,
    },
    {
      staffel: "E",
      menge: offerDetails.calculation_quantityE || 0,
      staffel_m:
        offerDetails._pricing_endprices_graduated_without_confection_lfm_quantityE ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_without_confection_stk_quantityE ||
        0,
      stueck:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityE ||
        0,
    },
  ];

  const StaffelpreiseInkl = [
    {
      staffel: "A",
      staffel_m:
        offerDetails._pricing_endprices_graduated_with_confection_lfm_quantityA ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityA ||
        0,
    },
    {
      staffel: "B",
      staffel_m:
        offerDetails._pricing_endprices_graduated_with_confection_lfm_quantityB ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityB ||
        0,
    },
    {
      staffel: "C",
      staffel_m:
        offerDetails._pricing_endprices_graduated_with_confection_lfm_quantityC ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityC ||
        0,
    },
    {
      staffel: "D",
      staffel_m:
        offerDetails._pricing_endprices_graduated_with_confection_lfm_quantityD ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityD ||
        0,
    },
    {
      staffel: "E",
      staffel_m:
        offerDetails._pricing_endprices_graduated_with_confection_lfm_quantityE ||
        0,
      staffel_stk:
        offerDetails._pricing_endprices_graduated_with_confection_stk_quantityE ||
        0,
    },
  ];

  return {
    calculation,
    staffelpreise,
    StaffelpreiseInkl,
  };
};
