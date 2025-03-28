import { BasicModel } from "@interfaces/Basic.model";
import { handleRequest } from "./handler/handleRequest";

export class RolesApi {
  static async getAllRoles() {
    return await handleRequest<BasicModel[]>({
      method: "GET",
      endpoint: "roles",
    });
  }
}
