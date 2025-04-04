import { OffersModel } from "@interfaces/Offers.model";
import { handleRequest } from "./handler/handleRequest";

export class OffersApi {
  static async getAllOffers() {
    return await handleRequest<OffersModel[]>({
      method: "GET",
      endpoint: "offers",
    });
  }

  static async getOfferById(offerId: number) {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `offers/${offerId}`,
    });
  }

  static async createOffer(data: any) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: "offers",
      data,
    });
  }

  static async UpdateOffer(
    offerId: number,
    offer: { field: string; value: any }
  ) {
    return await handleRequest<any>({
      method: "PATCH",
      endpoint: `offers/${offerId}`,
      data: offer,
    });
  }

  // Drawings
  static async getDrawing(offerId: number) {
    return await handleRequest<any>({
      method: "GET",
      endpoint: `offers/${offerId}/drawing`,
    });
  }

  static async storeDrawing(offerId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await handleRequest<any>({
      method: "POST",
      endpoint: `offers/${offerId}/drawing`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
