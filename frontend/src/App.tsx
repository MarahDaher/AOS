import AppRouter from "./shared/router/AppRouter";
import theme from "./shared/theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { de } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {} from "@mui/x-date-pickers/";
function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
