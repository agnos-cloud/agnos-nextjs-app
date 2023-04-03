import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import FullLayout from "../components/Layouts/FullLayout";
import ColorModeProvider from "../providers/ColorModeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <UserProvider>
      <ColorModeProvider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FullLayout>
            <Component {...pageProps} />
          </FullLayout>
        </ThemeProvider>
      </ColorModeProvider>
    </UserProvider>
  );
}

export default MyApp;
