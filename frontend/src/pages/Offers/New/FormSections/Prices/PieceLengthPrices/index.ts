import { PieceLengthPriceRow } from "./PieceLengthPricesTable";

const staffels = ["A", "B", "C", "D", "E"] as const;

export function mapPieceLengthPricesFromOffer(
  offer: any
): PieceLengthPriceRow[] {
  return staffels.map((suffix) => ({
    menge: offer[`calculation_quantity${suffix}`] ?? 0,
    staffelM:
      offer[`_pricing_piece_length_prices_graduated_lfm_quantity${suffix}`] ??
      0,
    length1:
      offer[`_pricing_piece_length_prices_length1_quantity${suffix}`] ?? 0,
    length2:
      offer[`_pricing_piece_length_prices_length2_quantity${suffix}`] ?? 0,
    length3:
      offer[`_pricing_piece_length_prices_length3_quantity${suffix}`] ?? 0,
    length4:
      offer[`_pricing_piece_length_prices_length4_quantity${suffix}`] ?? 0,
    length5:
      offer[`_pricing_piece_length_prices_length5_quantity${suffix}`] ?? 0,
  }));
}
