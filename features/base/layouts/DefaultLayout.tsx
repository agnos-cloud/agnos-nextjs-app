import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import AppBar from "./components/AppBar";
import Drawer, { DrawerHeader } from "./components/Drawer";
import Footer from "./components/Footer";
import { MultiPurposeDialog } from "@components";
import { useApp } from "@hooks/base";

function DefaultLayout({ children }: any) {
  const { user } = useUser();
  const { closeDialog, dialogActions, dialogIsOpen, dialogTitle } = useApp();

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

          <MultiPurposeDialog open={dialogIsOpen} title={dialogTitle} onClose={closeDialog} actions={dialogActions}>
            <div>Hello World!</div>
          </MultiPurposeDialog>
        </Box>
      </Box>
      {false && <Footer />}
    </>
  );
}

export default DefaultLayout;
