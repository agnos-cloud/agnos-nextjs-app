// import "module-alias/register";
import "@styles/globals.css";
import React, { JSXElementConstructor, ReactElement } from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Breakpoint, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { DefaultLayout } from "@layouts/base";
import AppProvider from "@providers/base";
import { DialogAction, DialogOptions, ToastOptions, ToastPosition } from "@types";
import { InvocationType } from "@constants/invocation";
import { LogType } from "@constants/log";
import { MultiPurposeDialog, Toast } from "@components";

function MyApp({ Component, pageProps }: AppProps) {
  const [dialogActions, setDialogActions] = React.useState<DialogAction[]>([]);
  const [dialogContent, setDialogContent] = React.useState<ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null>(null);
  const [dialogIsLoading, setDialogIsLoading] = React.useState(false);
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogMaxWidth, setDialogMaxWidth] = React.useState<false | Breakpoint | undefined>();
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | string[]>("");
  const [toastPosition, setToastPosition] = React.useState<ToastPosition>(["top", "right"]);
  const [toastType, setToastType] = React.useState<InvocationType | LogType>(LogType.info);
  const [toastIsOpen, setToastIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const app = React.useMemo(
    () => ({
      dialogActions,
      dialogContent,
      dialogIsLoading,
      dialogIsOpen,
      dialogTitle,
      drawerIsOpen,
      setDrawerIsOpen,
      setDialogIsLoading,
      openDialog: (options: DialogOptions) => {
        setDialogIsLoading(options.loading || false);
        setDialogTitle(options.title || "Dialog");
        setDialogContent(options.content);
        setDialogActions(options.actions || []);
        setDialogMaxWidth(options.maxWidth);
        setDialogIsOpen(true);
      },
      closeDialog: () => {
        setDialogIsOpen(false);
      },
      openToast: (options: ToastOptions) => {
        setToastMessage(options.message || "");
        setToastPosition(options.position || ["top", "right"]);
        setToastType(options.type || LogType.info);
        setToastIsOpen(true);
      },
      closeToast: () => {
        setToastIsOpen(false);
      },
      togglePaletteMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const states = {
    dialogActions,
    dialogContent,
    dialogIsLoading,
    dialogIsOpen,
    dialogTitle,
    drawerIsOpen,
    toastMessage,
    toastPosition,
    toastType,
    toastIsOpen,
  };

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
        <AppProvider value={{ ...app, ...states }}>
          <CssBaseline />
          <DefaultLayout>
            <Component {...pageProps} />

            <MultiPurposeDialog
              actions={dialogActions}
              loading={dialogIsLoading}
              open={dialogIsOpen}
              title={dialogTitle}
              maxWidth={dialogMaxWidth}
              onClose={() => setDialogIsOpen(false)}
            >
              {dialogContent}
            </MultiPurposeDialog>

            <Toast
              message={toastMessage}
              open={toastIsOpen}
              type={toastType}
              position={toastPosition}
              onClose={() => setToastIsOpen(false)}
            />
          </DefaultLayout>
        </AppProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
