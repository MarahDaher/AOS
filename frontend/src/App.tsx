import AppRouter from "./shared/router/AppRouter";
import theme from "./shared/theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AuthProvider } from "@contexts/AuthProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { de } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PermissionProvider } from "@contexts/PermissionProvider";
import { CASLProvider } from "@contexts/AbilityProvider";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AuthProvider>
          <PermissionProvider>
            <CASLProvider>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={de}
              >
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AppRouter />
                </ThemeProvider>
              </LocalizationProvider>
            </CASLProvider>
          </PermissionProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
