// import "module-alias/register";
import "@styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { DefaultLayout } from "@layouts/base";
import AppProvider from "@providers/base";
import { DialogAction, DialogOptions } from "@types";

function MyApp({ Component, pageProps }: AppProps) {
  const [dialogActions, setDialogActions] = React.useState<DialogAction[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const app = React.useMemo(
    () => ({
      setDialogActions,
      setDrawerIsOpen,
      openDialog: (options: DialogOptions) => {
        setDialogIsOpen(true);
        setDialogTitle(options.title || "Dialog");
        setDialogActions(options.actions || []);
      },
      closeDialog: () => {
        setDialogIsOpen(false);
      },
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
        <AppProvider value={{ ...app, dialogActions, dialogIsOpen, dialogTitle, drawerIsOpen }}>
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
