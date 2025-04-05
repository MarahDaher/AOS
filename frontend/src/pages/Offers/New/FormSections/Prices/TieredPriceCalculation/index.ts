import { StaffelPriceRow } from "@interfaces/StaffelPriceRow.model";

export const mapStaffelPricedata = (rawData: any[]): StaffelPriceRow[] => {
  return rawData.map((item) => {
    const match = item.staffel.match(/[A-E]/);
    const suffix = match ? match[0] : "";

    const isA = suffix === "A"; // Important check if Staffel is "A"

    return {
      staffel: item.staffel,
      menge: item[`_pricing_graduated_calculation_quantity${suffix}`],
      hourlyRateAddition:
        item[
          `pricing_graduated_calculation_quantity${suffix}_addition_to_hourlyrate`
        ],
      hourlyRate: isA
        ? item[`calculation_working_hourly_rate`] // For A
        : item[`_pricing_graduated_calculation_hourly_rate_quantity${suffix}`], // For B, C, D, E
      timeCostShare:
        item[
          `pricing_graduated_calculation_timescosts_relative_quantity${suffix}`
        ],
      setupCosts:
        item[
          `pricing_graduated_calculation_quantity${suffix}_addition_to_setup_costs`
        ],
      transport:
        item[
          `pricing_graduated_calculation_quantity${suffix}_addition_to_transport_costs`
        ],
      productionTime:
        item[`pricing_graduated_calculation_productiontime_quantity${suffix}`],
      rawMaterialQuantity:
        item[
          `pricing_graduated_calculation_rawmaterialquantity_quantity${suffix}`
        ],
      subtotal:
        item[`pricing_graduated_calculation_subtotal_quantity${suffix}`],
    };
  });
};
