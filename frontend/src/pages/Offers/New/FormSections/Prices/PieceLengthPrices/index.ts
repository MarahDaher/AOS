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
      offer[`_pricing_piece_length_prices_graduated_lfm_quantity${suffix}`] ??
      0,
    length625mm:
      offer[`_pricing_piece_length_prices_length625_quantity${suffix}`] ?? 0,
    length1000mm:
      offer[`_pricing_piece_length_prices_length1000_quantity${suffix}`] ?? 0,
    length1250mm:
      offer[`_pricing_piece_length_prices_length1250_quantity${suffix}`] ?? 0,
    length1333mm:
      offer[`_pricing_piece_length_prices_length1333_quantity${suffix}`] ?? 0,
  }));
}
