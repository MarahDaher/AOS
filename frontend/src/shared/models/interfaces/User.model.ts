import { BasicModel } from "./Basic.model";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: BasicModel;
}

export interface UserProdileModel extends UserModel {
  permissions: string[];
}

type BaseUserInput = Omit<UserModel, "id" | "role">;

export interface CreateUserModel extends BaseUserInput {
  password: string;
  role_id: number;
}

export type UpdateUserModel = Omit<CreateUserModel, "password">;

export interface ChangePasswordModel {
  newPassword: string;
  newPassword_confirmation: string;
}
