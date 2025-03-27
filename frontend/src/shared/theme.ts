import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      card: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      card?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "#FBFCFD",
      paper: "#ffffff",
    },
    // primary: {
    //   main: "#1a1a1a",
    // },
  },
});

const finalTheme = createTheme(theme, {
  palette: {
    custom: {
      card: "#ffffff",
    },
  },
});

export default finalTheme;
