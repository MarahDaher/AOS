import {
  ChangePasswordModel,
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from "@interfaces/User.model";
import { handleRequest } from "api/handler/handleRequest";

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

  static async updateUser(userId: string, user: UpdateUserModel) {
    return await handleRequest<UpdateUserModel>({
      method: "PUT",
      endpoint: `users/${userId}`,
      data: user,
    });
  }

  static async changePassword(newpassword: ChangePasswordModel) {
    return await handleRequest<UserModel>({
      method: "PUT",
      endpoint: `users/change-password`,
      data: { newpassword },
    });
  }
}
