import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout: FunctionComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar only on mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              AOS App
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Sidebar
        variant={isMobile ? "temporary" : "permanent"}
        temporaryOpen={mobileOpen}
        onTemporaryClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, mt: isMobile ? 7 : 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
