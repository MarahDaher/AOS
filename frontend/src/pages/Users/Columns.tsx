import { UserModel } from "@interfaces/User.model";

export type Column<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

export const UserColumns: Column<UserModel>[] = [
  { label: "Name", render: (row) => row.name },
  { label: "E-Mail", render: (row) => row.email },
  { label: "Rolle", render: (row) => row.role.name },
];
