import { RawMaterialModel } from "@interfaces/RawMaterial.model";
import { handleRequest } from "./handler/handleRequest";

export class RawMaterialApi {
  static async getAllOffers() {
    return await handleRequest<RawMaterialModel[]>({
      method: "GET",
      endpoint: "raw-materials",
    });
  }

  static async updateRawMaterial(id: number, data: any) {
    return await handleRequest<RawMaterialModel>({
      method: "PATCH",
      endpoint: `raw-materials/${id}`,
      data,
    });
  }
}
