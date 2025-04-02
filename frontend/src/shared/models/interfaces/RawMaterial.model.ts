export interface RawMaterialModel {
  id: number;
  name: string;
  type: string;
  price_per_kg: number;
  price_date: string;
}

export interface OfferRawMaterialCalculatedModel {
  offer_id: number;
  raw_material_id: number;
  absolut_demand: number;
  share: number;
  supplier?: string;
}

export interface RawMaterialRow {
  offer_id: number;
  raw_material_id: number;
  name?: string;
  type?: string;
  supplier?: string;
  share: number;
  price?: number;
  price_date?: string;
  _price_minus_discount?: number;
  _price_share?: number;
  _price_minus_discount_share?: number;
}

export interface BaseMaterial {
  id: number;
  name: string;
}
