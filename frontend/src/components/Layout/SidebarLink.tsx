import { Can } from "@contexts/AbilityProvider";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

interface SidebarLinkProps {
  path: string;
  label: string;
  icon: React.ElementType;
  subject: string;
  collapsed: boolean;
  onClick: (path: string) => void;
}

export const SidebarLink = ({
  path,
  label,
  icon: IconComponent,
  subject,
  collapsed,
  onClick,
}: SidebarLinkProps) => {
  return (
    <Can I="view" a={subject}>
      {(allowed) =>
        allowed && (
          <Tooltip title={collapsed ? label : ""} placement="right">
            <ListItemButton
              onClick={() => onClick(path)}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 2 : 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  justifyContent: "center",
                  mr: collapsed ? 0 : 2,
                }}
              >
                <IconComponent />
              </ListItemIcon>
              {!collapsed && <ListItemText primary={label} />}
            </ListItemButton>
          </Tooltip>
        )
      }
    </Can>
  );
};
