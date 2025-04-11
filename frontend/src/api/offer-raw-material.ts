import { handleRequest } from "./handler/handleRequest";

export class OfferRawMaterialCalculatedApi {
  static async getRawMaterialCalculatedByOfferId(offerId: number) {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `offers/${offerId}/raw-materials-calculated`,
    });
  }

  static async createRawMaterial(data: {
    offer_id: number;
    raw_material_id: number;
  }) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: `offer-raw-materials`,
      data,
    });
  }

  static async updateRawMaterial(
    offerId: number,
    rawMaterialId: number,
    data: any
  ) {
    return await handleRequest<any>({
      method: "PATCH",
      endpoint: `offers/${offerId}/raw-materials/${rawMaterialId}`,
      data,
    });
  }

  static async updateRawMaterialDemand(
    offerId: number,
    rawMaterialId: number,
    data: any
  ) {
    return await handleRequest<any>({
      method: "PATCH",
      endpoint: `offers/${offerId}/raw-materials-demand/${rawMaterialId}`,
      data,
    });
  }

  static async deleteRawMaterial(offerId: number, rawMaterialId: number) {
    return await handleRequest<any>({
      method: "DELETE",
      endpoint: `offers/${offerId}/raw-materials/${rawMaterialId}`,
    });
  }
}
