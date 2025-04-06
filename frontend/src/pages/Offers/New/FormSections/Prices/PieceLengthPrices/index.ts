import { PieceLengthPriceRow } from "./PieceLengthPricesTable";

const staffels = ["A", "B", "C", "D", "E"] as const;
type StaffelSuffix = (typeof staffels)[number];

const mengen: Record<StaffelSuffix, number> = {
  A: 500,
  B: 1000,
  C: 2500,
  D: 5000,
  E: 5000,
};

export function mapPieceLengthPricesFromOffer(
  offer: any
): PieceLengthPriceRow[] {
  return staffels.map((suffix) => ({
    menge: mengen[suffix],
    staffelM:
      offer[
        `_pricing_endprices_graduated_without_confection_lfm_quantity${suffix}`
      ] ?? 0,
    length625mm:
      offer[
        `_pricing_endprices_graduated_with_confection_stk_quantity${suffix}`
      ] ?? 0, //
    length1000mm:
      offer[
        `_pricing_endprices_graduated_with_confection_stk_quantity${suffix}`
      ] ?? 0,
    length1250mm:
      offer[
        `_pricing_endprices_graduated_with_confection_stk_quantity${suffix}`
      ] ?? 0,
    length1333mm:
      offer[
        `_pricing_endprices_graduated_with_confection_stk_quantity${suffix}`
      ] ?? 0,
  }));
}
