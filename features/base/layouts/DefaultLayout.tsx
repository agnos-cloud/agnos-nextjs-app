import * as React from "react";
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Avatar,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as DesignsIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  FlashOn as FunctionsIcon,
  Power as PluginsIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Store as MarketIcon,
  Group as TeamsIcon,
} from "@mui/icons-material";
import Head from "next/head";
import router from "next/router";
import Footer from "./components/Footer";

import { DESIGNS_PATH, FUNCTIONS_PATH, LOGOUT_PATH, PLUGINS_PATH, STORE_PATH, TEAMS_PATH } from "@constants/paths";
import { useUser } from "@auth0/nextjs-auth0";
import AppBar from "./components/AppBar";
import { DRAWER_WIDTH } from "@constants/dimensions";

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function DefaultLayout({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mainMenus = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => router.push("/"),
    },
    {
      text: "Designs",
      icon: <DesignsIcon />,
      onClick: () => router.push(DESIGNS_PATH),
    },
    {
      text: "Plugins",
      icon: <PluginsIcon />,
      onClick: () => router.push(PLUGINS_PATH),
    },
    {
      text: "Functions",
      icon: <FunctionsIcon />,
      onClick: () => router.push(FUNCTIONS_PATH),
    },
    {
      text: "Teams",
      icon: <TeamsIcon />,
      onClick: () => router.push(TEAMS_PATH),
    },
    {
      text: "Marketplace",
      icon: <MarketIcon />,
      onClick: () => router.push(STORE_PATH),
    },
  ];

  const userMenus = [
    {
      text: user?.name ?? "Profile",
      icon: user?.picture ? (
        <Avatar alt={user?.name ?? ""} src={user?.picture} sx={{ width: 20, height: 20 }} />
      ) : (
        <ProfileIcon />
      ),
      onClick: () => router.push("/profile"),
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      onClick: () => router.push("/settings"),
    },
    {
      text: "Sign out",
      icon: <LogoutIcon />,
      onClick: () => router.push(LOGOUT_PATH),
    },
  ];

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
        {user && (
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {mainMenus.map((menu) => (
                <ListItemButton
                  key={menu.text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={menu.onClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              ))}
            </List>
            <Divider />
            <List>
              {userMenus.map((menu) => (
                <ListItemButton
                  key={menu.text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={menu.onClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        )}
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
