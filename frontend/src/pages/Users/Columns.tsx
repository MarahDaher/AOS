import { UserModel } from "@interfaces/User.model";
import type { Column } from "@types/Table";

export const UserColumns: Column<UserModel>[] = [
  { label: "Benutzername", render: (row) => row.username },
  { label: "E-Mail", render: (row) => row.email },
  { label: "Rolle", render: (row) => row.role },
];

export const tableData = [
  {
    id: 1,
    username: "max.mustermann",
    email: "max@example.com",
    role: "admin",
  },
  {
    id: 2,
    username: "lisa.schmidt",
    email: "lisa@example.com",
    role: "sales",
  },
  {
    id: 3,
    username: "julia.meier",
    email: "julia@example.com",
    role: "production",
  },
  {
    id: 4,
    username: "tom.schneider",
    email: "tom@example.com",
    role: "production",
  },
  {
    id: 5,
    username: "emma.bauer",
    email: "emma@example.com",
    role: "production",
  },
  { id: 6, username: "leo.huber", email: "leo@example.com", role: "sales" },
  {
    id: 7,
    username: "lena.keller",
    email: "lena@example.com",
    role: "production",
  },
  {
    id: 8,
    username: "paul.fischer",
    email: "paul@example.com",
    role: "production",
  },
  {
    id: 9,
    username: "nina.frank",
    email: "nina@example.com",
    role: "sales",
  },
  {
    id: 10,
    username: "jan.wagner",
    email: "jan@example.com",
    role: "sales",
  },
  {
    id: 11,
    username: "anna.koch",
    email: "anna@example.com",
    role: "Administrator",
  },
  {
    id: 12,
    username: "ben.mueller",
    email: "ben@example.com",
    role: "Benutzer",
  },
  {
    id: 13,
    username: "laura.schulz",
    email: "laura@example.com",
    role: "Benutzer",
  },
  { id: 14, username: "tim.weber", email: "tim@example.com", role: "Benutzer" },
  {
    id: 15,
    username: "mia.becker",
    email: "mia@example.com",
    role: "Administrator",
  },
  {
    id: 16,
    username: "felix.hoffmann",
    email: "felix@example.com",
    role: "Benutzer",
  },
  {
    id: 17,
    username: "lilly.wolf",
    email: "lilly@example.com",
    role: "Benutzer",
  },
  {
    id: 18,
    username: "lukas.schmidt",
    email: "lukas@example.com",
    role: "Administrator",
  },
  {
    id: 19,
    username: "marie.kruger",
    email: "marie@example.com",
    role: "Benutzer",
  },
  {
    id: 20,
    username: "david.lang",
    email: "david@example.com",
    role: "Benutzer",
  },
];
