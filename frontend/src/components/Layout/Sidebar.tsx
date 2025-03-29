import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Box,
  ListItemButton,
  Tooltip,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { SidebarItems } from "./SidebarItems";
import AOSLogo from "../../assets/aos-logo.png";
import { useState } from "react";
import { useAuth } from "@contexts/AuthProvider";
import { SidebarLink } from "./SidebarLink";

const MIN_WIDTH = 80;
const MAX_WIDTH = 220;

interface Props {
  variant: "permanent" | "temporary";
  temporaryOpen?: boolean;
  onTemporaryClose?: () => void;
}

const Sidebar = ({
  variant,
  temporaryOpen = false,
  onTemporaryClose,
}: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Manage mini/full sidebar toggle for permanent variant
  const [collapsed, setCollapsed] = useState(true);
  const isPermanent = variant === "permanent";

  const userName = "Michael Diebner";
  const userInitials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const handleNav = (path: string) => {
    navigate(path);
    if (!isPermanent) {
      onTemporaryClose?.();
    }
  };

  return (
    <Drawer
      variant={variant}
      open={isPermanent ? true : temporaryOpen}
      onClose={onTemporaryClose}
      sx={{
        width: collapsed ? MIN_WIDTH : MAX_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? MIN_WIDTH : MAX_WIDTH,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Collapse Toggle (always shown) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <img src={AOSLogo} alt="logo" width="60" height="25" />
      </Box>

      {/* User Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : "flex-start",
          py: 1,
          px: collapsed ? 0 : 2,
        }}
      >
        <Avatar sx={{ width: 50, height: 50 }}>{userInitials}</Avatar>
        <Typography variant="h6" pt={1}>
          {collapsed ? userInitials : userName}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {SidebarItems.map((item) => (
            <SidebarLink
              key={item.path}
              {...item}
              collapsed={collapsed}
              onClick={handleNav}
            />
          ))}
        </List>
      </Box>

      <Divider />

      <List>
        <Tooltip title={collapsed ? "Abmelden" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              logout();
              navigate("/anmelden");
              if (!isPermanent) onTemporaryClose?.();
            }}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 2 : 3,
              py: 1.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "unset",
                justifyContent: "center",
                mr: collapsed ? 0 : 2,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Abmelden" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
