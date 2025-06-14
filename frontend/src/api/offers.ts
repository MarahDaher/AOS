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

  static async duplicateOffer(offerId: number) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: `offers/${offerId}/duplicate`,
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

  // Export
  static async export(offerId: number, template?: string) {
    let url = `${import.meta.env.VITE_API_URL}/offers/${offerId}/export`;
    if (template) {
      url += `?template=${encodeURIComponent(template)}`;
    }

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Offer_${offerId}.docx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async getEditableFields(offerId: number) {
    return await handleRequest<string[]>({
      method: "GET",
      endpoint: `offers/${offerId}/editable-fields`,
    });
  }

  // Offer status
  static async getAllOfferStatus() {
    return await handleRequest<any[]>({
      method: "GET",
      endpoint: "/offer-status",
    });
  }

  // Delete Offer
  static async deleteOffer(offerId: number) {
    return await handleRequest<any>({
      method: "DELETE",
      endpoint: `offers/${offerId}`,
    });
  }

  // Templates
  static async getTemplates() {
    return await handleRequest<any[]>({
      method: "GET",
      endpoint: "templates",
    });
  }
}
