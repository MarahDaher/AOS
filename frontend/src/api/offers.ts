import { OffersModel } from "@interfaces/Offers.model";
import { handleRequest } from "./handler/handleRequest";

export class OffersApi {
  static async getAllOffers() {
    return await handleRequest<OffersModel[]>({
      method: "GET",
      endpoint: "offers",
    });
  }
}
