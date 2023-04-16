import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import AppBar from "./components/AppBar";
import Drawer, { DrawerHeader } from "./components/Drawer";
import Footer from "./components/Footer";
import { MultiPurposeDialog, Toast } from "@components";
import { useApp } from "@hooks/base";

function DefaultLayout({ children }: any) {
  const { user } = useUser();
  const {
    closeDialog,
    dialogActions,
    dialogContent,
    dialogIsLoading,
    dialogIsOpen,
    dialogTitle,
    closeToast,
    toastMessage,
    toastType,
    toastIsOpen,
  } = useApp();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>Agnos Cloud</title>
          <meta name="description" content="Agnos Cloud" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <AppBar />
        {user && <Drawer />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}

          <MultiPurposeDialog
            actions={dialogActions}
            loading={dialogIsLoading}
            open={dialogIsOpen}
            title={dialogTitle}
            onClose={closeDialog}
          >
            {dialogContent}
          </MultiPurposeDialog>

          <Toast message={toastMessage} open={toastIsOpen} type={toastType} onClose={closeToast} />
        </Box>
      </Box>
      {false && <Footer />}
    </>
  );
}

export default DefaultLayout;
