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
