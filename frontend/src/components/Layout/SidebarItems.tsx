import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface SidebarItem {
  path: string;
  label: string;
  icon: any;
}

export const SidebarItems: SidebarItem[] = [
  {
    path: "/",
    label: "Angebote/Aufträge",
    icon: FormatListBulletedIcon,
  },
  {
    path: "/benutzer",
    label: "Benutzer",
    icon: PeopleAltIcon,
  },
];
