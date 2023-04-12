// import "module-alias/register";
import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { DefaultLayout } from "@layouts/base";
import ColorModeProvider from "../providers/ColorModeProvider";
import AppProvider from "@providers/base";

function MyApp({ Component, pageProps }: AppProps) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
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

  const app = { openDrawer, setOpenDrawer };

  return (
    <UserProvider>
      <ColorModeProvider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AppProvider value={app}>
            <CssBaseline />
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </AppProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </UserProvider>
  );
}

export default MyApp;
