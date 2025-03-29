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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OfferProvider } from "@contexts/OfferProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
                  <OfferProvider>
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <AppRouter />
                    </ThemeProvider>
                  </OfferProvider>
                </LocalizationProvider>
              </CASLProvider>
            </PermissionProvider>
          </AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
