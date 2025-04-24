import { StaffelPriceRow } from "@interfaces/StaffelPriceRow.model";

export const mapStaffelPricedataFromOffer = (offer: any): StaffelPriceRow[] => {
  const staffels = ["A", "B", "C", "D", "E"];

  return staffels.map((suffix) => {
    const isA = suffix === "A";

    return {
      staffel: suffix,
      Menge: offer[`_pricing_graduated_calculation_quantity${suffix}`],
      AufschlagStundensatz: offer[`pricing_grad_qty${suffix}_add_hourlyrate`],
      Stundensatz: isA
        ? offer[`calculation_working_hourly_rate`]
        : offer[`_pricing_graduated_calculation_hourly_rate_quantity${suffix}`],
      Zeitkostenanteil:
        offer[
          `_pricing_graduated_calculation_timecosts_relative_quantity${suffix}`
        ],
      Rüstkosten: offer[`pricing_grad_qty${suffix}_add_setupcosts`],
      Transport: offer[`pricing_grad_qty${suffix}_add_transport`],

      Produktionszeit:
        offer[
          `_pricing_graduated_calculation_productiontime_quantity${suffix}`
        ],

      Rohstoffmenge:
        offer[
          `_pricing_graduated_calculation_rawmaterialquantity_quantity${suffix}`
        ],
      Zwischensumme:
        offer[`_pricing_graduated_calculation_subtotal_quantity${suffix}`], //Zwischensumme

      Zeitkosten:
        offer[
          `_pricing_graduated_calculation_timecosts_total_quantity${suffix}`
        ], // zeitkosten
      Rohstoffpreis:
        offer[
          `_pricing_graduated_calculation_rawmaterial_costs_quantity${suffix}`
        ],
      Zwischensumme2:
        offer[`_pricing_graduated_calculation_subtotal2_quantity${suffix}`],
      Zwischensumme2m:
        offer[`_pricing_graduated_calculation_subtotal_lfm_quantity${suffix}`],
    };
  });
};
