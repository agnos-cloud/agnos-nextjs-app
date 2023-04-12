import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import Head from "next/head";
import Footer from "./components/Footer";

import { useUser } from "@auth0/nextjs-auth0";
import AppBar from "./components/AppBar";
import Drawer, { DrawerHeader } from "./components/Drawer";

function DefaultLayout({ children }: any) {
  const { user } = useUser();

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
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default DefaultLayout;
