import { StaffelPriceRow } from "@interfaces/StaffelPriceRow.model";

export const mapStaffelPricedataFromOffer = (offer: any): StaffelPriceRow[] => {
  const staffels = ["A", "B", "C", "D", "E"];

  return staffels.map((suffix) => {
    const isA = suffix === "A";

    return {
      staffel: suffix,
      menge: offer[`_pricing_graduated_calculation_quantity${suffix}`],
      hourlyRateAddition: offer[`pricing_grad_qty${suffix}_add_hourlyrate`],
      hourlyRate: isA
        ? offer[`calculation_working_hourly_rate`]
        : offer[`_pricing_graduated_calculation_hourly_rate_quantity${suffix}`],
      timeCostShare:
        offer[
          `_pricing_graduated_calculation_timecosts_relative_quantity${suffix}`
        ],
      setupCosts: offer[`pricing_grad_qty${suffix}_add_setupcosts`],
      transport: offer[`pricing_grad_qty${suffix}_add_transport`],
      productionTime:
        offer[
          `_pricing_graduated_calculation_productiontime_quantity${suffix}`
        ],
      rawMaterialQuantity:
        offer[
          `_pricing_graduated_calculation_rawmaterialquantity_quantity${suffix}`
        ],
      subtotal:
        offer[`_pricing_graduated_calculation_subtotal_quantity${suffix}`],
    };
  });
};
