export interface UserModel {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserProdileModel extends UserModel {
  permissions: string[];
}

type BaseUserInput = Omit<UserModel, "id" | "role">;

export interface CreateUserModel extends BaseUserInput {
  password: string;
  role_id: string;
}

export type UpdateUserModel = Omit<CreateUserModel, "password">;

export interface ChangePasswordModel {
  newPassword: string;
  newPassword_confirmation: string;
}
