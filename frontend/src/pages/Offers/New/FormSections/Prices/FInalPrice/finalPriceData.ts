// mock/finalPriceData.ts
const finalPriceMock = {
  calculation: {
    _pricing_costs_calc_time_costs_quantity: 245.25, //zeitkosten
    _pricing_costs_calc_raw_material_price_total: 358.16, //rohstoffpreis
    _calculation_additional_setup_costs_total: 126, //ruestzeit
    _pricing_endprices_calc_packing_costs: 48.6, //verpackung
    _pricing_endprices_calc_transport_costs: 100, //Transport
    _pricing_endprices_calc_print_costs: 5, //druck
    _pricing_endprices_calc_confection_lfm_costs: 242.47, //konfektion1
    _pricing_endprices_calc_confection_stk_costs: 0,
    zusatz: 0,
    calculation_working_commission: 0,
    calculation_working_profit: 178,
    calculation_working_discount: 0,
    _pricing_endprices_calc_sum: 1443.47,
  },
  staffelpreise: [
    {
      staffel: "A",
      calculation_quantityA: 500, // menge
      _pricing_endprices_graduated_prices_without_confection_lfm_quantityA: 1.92,
      _pricing_endprices_graduated_prices_without_confection_stk_quantityA: 3.07,
      _pricing_endprices_graduated_prices_pieces_quantityA: 313,
    },
    {
      staffel: "B",
      calculation_quantityB: 1000, //menge
      _pricing_endprices_graduated_prices_without_confection_lfm_quantityB: 1.69,
      _pricing_endprices_graduated_prices_without_confection_stk_quantityB: 2.54,
      _pricing_endprices_graduated_prices_pieces_quantityB: 625,
    },
    {
      staffel: "C",
      calculation_quantityC: 2500,
      _pricing_endprices_graduated_prices_without_confection_lfm_quantityC: 1.54,
      _pricing_endprices_graduated_prices_without_confection_stk_quantityC: 2.46,
      _pricing_endprices_graduated_prices_pieces_quantityC: 1563,
    },
    {
      staffel: "D",
      calculation_quantityD: 5000,
      _pricing_endprices_graduated_prices_without_confection_lfm_quantityD: 1.49,
      _pricing_endprices_graduated_prices_without_confection_stk_quantityD: 2.3,
      _pricing_endprices_graduated_prices_pieces_quantityD: 3125,
    },
    {
      staffel: "E",
      calculation_quantityE: 5000,
      _pricing_endprices_graduated_prices_without_confection_lfm_quantityE: 1.49,
      _pricing_endprices_graduated_prices_without_confection_stk_quantityE: 5.5,
      _pricing_endprices_graduated_prices_pieces_quantityE: 0,
    },
  ],
  StaffelpreiseInkl: [
    {
      staffel: "A",
      _pricing_endprices_graduated_with_confection_lfm_quantityA: 1.92,
      _pricing_endprices_graduated_with_confection_stk_quantityA: 2.8,
    },
    {
      staffel: "B",
      _pricing_endprices_graduated_with_confection_lfm_quantityB: 1.92,
      _pricing_endprices_graduated_with_confection_stk_quantityB: 2.4,
    },
    {
      staffel: "C",
      _pricing_endprices_graduated_with_confection_lfm_quantityC: 1.92,
      _pricing_endprices_graduated_with_confection_stk_quantityC: 2.0,
    },
    {
      staffel: "D",
      _pricing_endprices_graduated_with_confection_lfm_quantityD: 1.92,
      _pricing_endprices_graduated_with_confection_stk_quantityD: 2,
    },
    {
      staffel: "E",
      _pricing_endprices_graduated_with_confection_lfm_quantityE: 1.92,
      _pricing_endprices_graduated_with_confection_stk_quantityE: 2,
    },
  ],
  StaffelPricedata: [
    {
      staffel: "A (Kalkulationsmenge)",
      _pricing_graduated_calculation_quantityA: 500, //merge
      pricing_graduated_calculation_quantityA_addition_to_hourlyrate: 0, // Aufschlag
      calculation_working_hourly_rate: 60, // Stundensatz
      pricing_graduated_calculation_timescosts_relative_quantityA: 40, // Zeitkostenanteil
      pricing_graduated_calculation_quantityA_addition_to_setup_costs: 126, // Rüstkosten
      pricing_graduated_calculation_quantityA_addition_to_transport_costs: 100, // Transport
      pricing_graduated_calculation_productiontime_quantityA: 4.1, // Produktionszeit
      pricing_graduated_calculation_rawmaterialquantity_quantityA: 170.15, // Rohstoffmenge
      pricing_graduated_calculation_subtotal_quantityA: 606.34, // Zwischensumme
      _pricing_graduated_calculation_subtotal_lfm_quantityA: 606.34, // Zwischensumme [m]
    },
    {
      staffel: "B",
      _pricing_graduated_calculation_quantityB: 1000, //merge
      pricing_graduated_calculation_quantityB_addition_to_hourlyrate: 2, // Aufschlag
      _pricing_graduated_calculation_hourly_rate_quantityB: 60, // Stundensatz
      pricing_graduated_calculation_timescosts_relative_quantityB: 40, // Zeitkostenanteil
      pricing_graduated_calculation_quantityB_addition_to_setup_costs: 126, // Rüstkosten
      pricing_graduated_calculation_quantityB_addition_to_transport_costs: 100, // Transport
      pricing_graduated_calculation_productiontime_quantityB: 8.2, // Produktionszeit
      pricing_graduated_calculation_rawmaterialquantity_quantityB: 344.52, // Rohstoffmenge
      pricing_graduated_calculation_subtotal_quantityB: 1213.97, // Zwischensumme
      _pricing_graduated_calculation_subtotal_lfm_quantityB: 1213.97, // Zwischensumme [m]
    },
    {
      staffel: "C",
      _pricing_graduated_calculation_quantityC: 2500, //merge
      pricing_graduated_calculation_quantityC_addition_to_hourlyrate: 2, // Aufschlag
      _pricing_graduated_calculation_hourly_rate_quantityC: 60, // Stundensatz
      pricing_graduated_calculation_timescosts_relative_quantityC: 40, // Zeitkostenanteil
      pricing_graduated_calculation_quantityC_addition_to_setup_costs: 126, // Rüstkosten
      pricing_graduated_calculation_quantityC_addition_to_transport_costs: 100, // Transport
      pricing_graduated_calculation_productiontime_quantityC: 8.2, // Produktionszeit
      pricing_graduated_calculation_rawmaterialquantity_quantityC: 344.52, // Rohstoffmenge
      pricing_graduated_calculation_subtotal_quantityC: 1213.97, // Zwischensumme
      _pricing_graduated_calculation_subtotal_lfm_quantityC: 1213.97, // Zwischensumme [m]
    },
    {
      staffel: "D",
      pricing_graduated_calculation_quantityD_addition_to_hourlyrate: 0, // Aufschlag
      _pricing_graduated_calculation_hourly_rate_quantityD: 60, // Stundensatz
      pricing_graduated_calculation_timescosts_relative_quantityD: 40, // Zeitkostenanteil
      pricing_graduated_calculation_quantityD_addition_to_setup_costs: 126, // Rüstkosten
      pricing_graduated_calculation_quantityD_addition_to_transport_costs: 100, // Transport
      pricing_graduated_calculation_productiontime_quantityD: 8.2, // Produktionszeit
      pricing_graduated_calculation_rawmaterialquantity_quantityD: 344.52, // Rohstoffmenge
      pricing_graduated_calculation_subtotal_quantityD: 1213.97, // Zwischensumme
      _pricing_graduated_calculation_subtotal_lfm_quantityD: 1213.97, // Zwischensumme [m]
    },
    {
      staffel: "E",
      pricing_graduated_calculation_quantityE_addition_to_hourlyrate: 0, // Aufschlag
      _pricing_graduated_calculation_hourly_rate_quantityE: 60, // Stundensatz
      pricing_graduated_calculation_timescosts_relative_quantityE: 40, // Zeitkostenanteil
      pricing_graduated_calculation_quantityE_addition_to_setup_costs: 126, // Rüstkosten
      pricing_graduated_calculation_quantityE_addition_to_transport_costs: 100, // Transport
      pricing_graduated_calculation_productiontime_quantityE: 8.2, // Produktionszeit
      pricing_graduated_calculation_rawmaterialquantity_quantityE: 344.52, // Rohstoffmenge
      pricing_graduated_calculation_subtotal_quantityE: 1213.97, // Zwischensumme
      _pricing_graduated_calculation_subtotal_lfm_quantityE: 1213.97, // Zwischensumme [m]
    },
  ],
};

export default finalPriceMock;
