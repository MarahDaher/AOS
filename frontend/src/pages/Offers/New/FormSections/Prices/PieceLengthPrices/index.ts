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

export function mapPieceLengthPrices(rawData: any): PieceLengthPriceRow[] {
  return staffels.map((suffix) => ({
    menge: mengen[suffix],
    staffelM:
      rawData[`_pricing_piece_length_prices_graduated_lfm_quantity${suffix}`],
    length625mm:
      rawData[`_pricing_piece_length_prices_length625_quantity${suffix}`],
    length1000mm:
      rawData[`_pricing_piece_length_prices_length1000_quantity${suffix}`],
    length1250mm:
      rawData[`_pricing_piece_length_prices_length1250_quantity${suffix}`],
    length1333mm:
      rawData[`_pricing_piece_length_prices_length1333_quantity${suffix}`],
  }));
}

export const pieceLengthPricesMock = {
  // Staffel / m
  _pricing_piece_length_prices_graduated_lfm_quantityA: 1.92,
  _pricing_piece_length_prices_graduated_lfm_quantityB: 1.69,
  _pricing_piece_length_prices_graduated_lfm_quantityC: 1.54,
  _pricing_piece_length_prices_graduated_lfm_quantityD: 1.49,
  _pricing_piece_length_prices_graduated_lfm_quantityE: 1.49,

  // Länge 625mm
  _pricing_piece_length_prices_length625_quantityA: 1.2,
  _pricing_piece_length_prices_length625_quantityB: 1.06,
  _pricing_piece_length_prices_length625_quantityC: 0.96,
  _pricing_piece_length_prices_length625_quantityD: 0.93,
  _pricing_piece_length_prices_length625_quantityE: 0.93,

  // Länge 1000mm
  _pricing_piece_length_prices_length1000_quantityA: 1.92,
  _pricing_piece_length_prices_length1000_quantityB: 1.69,
  _pricing_piece_length_prices_length1000_quantityC: 1.54,
  _pricing_piece_length_prices_length1000_quantityD: 1.49,
  _pricing_piece_length_prices_length1000_quantityE: 1.49,

  // Länge 1250mm
  _pricing_piece_length_prices_length1250_quantityA: 1.92,
  _pricing_piece_length_prices_length1250_quantityB: 1.92,
  _pricing_piece_length_prices_length1250_quantityC: 1.92,
  _pricing_piece_length_prices_length1250_quantityD: 1.92,
  _pricing_piece_length_prices_length1250_quantityE: 1.92,

  // Länge 1333mm
  _pricing_piece_length_prices_length1333_quantityA: 1.92,
  _pricing_piece_length_prices_length1333_quantityB: 1.92,
  _pricing_piece_length_prices_length1333_quantityC: 1.92,
  _pricing_piece_length_prices_length1333_quantityD: 1.92,
  _pricing_piece_length_prices_length1333_quantityE: 1.92,
};

export default pieceLengthPricesMock;
