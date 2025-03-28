import { UserModel } from "@interfaces/User.model";
import type { Column } from "@types/Table";

export const UserColumns: Column<UserModel>[] = [
  { label: "Name", render: (row) => row.name },
  { label: "E-Mail", render: (row) => row.email },
  { label: "Rolle", render: (row) => row.role.name },
];
