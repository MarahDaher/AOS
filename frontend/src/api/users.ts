import {
  ChangePasswordModel,
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from "@interfaces/User.model";
import { handleRequest } from "@api/handler/handleRequest";

export class UsersApi {
  static async getAllUsers() {
    return await handleRequest<UserModel[]>({
      method: "GET",
      endpoint: "users",
    });
  }

  static async getUserById(userId: string) {
    return await handleRequest<UserModel>({
      method: "GET",
      endpoint: `users/${userId}`,
    });
  }

  static async createUser(user: CreateUserModel) {
    return await handleRequest<CreateUserModel>({
      method: "POST",
      endpoint: "users",
      data: user,
    });
  }

  static async updateUser(
    userId: number,
    user: Partial<UpdateUserModel> & { password?: string }
  ) {
    return await handleRequest<UpdateUserModel>({
      method: "PUT",
      endpoint: `users/${userId}`,
      data: user,
    });
  }

  static async deleteUser(userId: number) {
    return await handleRequest<UserModel>({
      method: "DELETE",
      endpoint: `users/${userId}`,
    });
  }

  static async changePassword(data: ChangePasswordModel) {
    return await handleRequest<any>({
      method: "POST",
      endpoint: `users/change-password`,
      data,
    });
  }
}
