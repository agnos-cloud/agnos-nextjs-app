// import "module-alias/register";
import "@styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { DefaultLayout } from "@layouts/base";
import AppProvider from "@providers/base";

function MyApp({ Component, pageProps }: AppProps) {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const app = React.useMemo(
    () => ({
      setDrawerIsOpen,
      togglePaletteMode: () => {
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
      <ThemeProvider theme={theme}>
        <AppProvider value={{ ...app, drawerIsOpen }}>
          <CssBaseline />
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </AppProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
