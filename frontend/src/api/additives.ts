import { handleRequest } from "./handler/handleRequest";

export class AdditiveApi {
  static async getAll() {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `additives`,
    });
  }

  static async getAdditivesForRawMaterial(
    offerId: number,
    rawMaterialId: number
  ) {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `additives-for-raw-material`,
      params: { offer_id: offerId, raw_material_id: rawMaterialId },
    });
  }

  static async addAdditiveToRawMaterial(data: {
    offer_id: number;
    raw_material_id: number;
    additives_id: number;
  }) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: "additives-offers-raw-materials",
      data,
    });
  }

  static async updateAdditiveOffer(data: {
    offer_id: number;
    raw_material_id: number;
    additives_id: number;
    price?: number;
    share?: number;
  }) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: "additives-offers-raw-materials/update",
      data,
    });
  }

  static async deleteAdditiveFromRawMaterial(data: {
    offer_id: number;
    raw_material_id: number;
    additives_id: number;
  }) {
    return await handleRequest<any>({
      method: "DELETE",
      endpoint: "additives-offers-raw-materials",
      params: data,
    });
  }
}
