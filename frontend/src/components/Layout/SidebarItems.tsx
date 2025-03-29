import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface SidebarItem {
  path: string;
  label: string;
  subject: string;
  icon: any;
}

export const SidebarItems: SidebarItem[] = [
  {
    path: "/",
    label: "Angebote/Aufträge",
    icon: FormatListBulletedIcon,
    subject: "offers",
  },
  {
    path: "/benutzer",
    label: "Benutzer",
    icon: PeopleAltIcon,
    subject: "users",
  },
];
