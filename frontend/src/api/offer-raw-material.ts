import { handleRequest } from "./handler/handleRequest";

export class OfferRawMaterialCalculatedApi {
  static async getRawMaterialCalculatedByOfferId(offerId: number) {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `offers/${offerId}/raw-materials-calculated`,
    });
  }

  static async update(offerId: number, rawMaterialId: number, data: any) {
    return await handleRequest<any>({
      method: "PATCH",
      endpoint: `offers/${offerId}/raw-materials/${rawMaterialId}`,
      data,
    });
  }
}
