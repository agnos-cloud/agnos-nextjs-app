import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
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
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as DesignsIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  FlashOn as IntegrationsIcon,
  Menu as MenuIcon,
  Power as PluginsIcon,
  Person as ProfileIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Store as MarketIcon,
  Group as TeamsIcon,
} from "@mui/icons-material";
import Head from "next/head";
import router from "next/router";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";

import { DESIGNS_PATH, LOGIN_PATH, LOGOUT_PATH, STORE_PATH, TEAMS_PATH } from "../../constants/paths";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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

function Layout({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setLoggedInUser(user);
    } else {
      setLoggedInUser(undefined);
    }
  }, [user, error, isLoading]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const homeMenus = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => router.push("/"),
    },
    {
      text: "Search",
      icon: <SearchIcon />,
      onClick: () => router.push("/search"),
    },
  ];

  const mainMenus = [
    {
      text: "Designs",
      icon: <DesignsIcon />,
      onClick: () => router.push(DESIGNS_PATH),
    },
    {
      text: "Teams",
      icon: <TeamsIcon />,
      onClick: () => router.push(TEAMS_PATH),
    },
    {
      // plugins are menus (the building blocks of your designs)
      text: "Plugins",
      icon: <PluginsIcon />,
      onClick: () => router.push("/plugins"),
    },
    {
      // integrations are config file generators that accept a system design and produce an equivalent config for diff systems
      // e.g. for serverless, terraform, aws cloud formation json, kubernetes etc.
      // they are implemented as endpoints to which system design is sent as part of the request and the config is received in the response
      text: "Integrations",
      icon: <IntegrationsIcon />,
      onClick: () => router.push("/integrations"),
    },
    {
      text: "Marketplace",
      icon: <MarketIcon />,
      onClick: () => router.push(STORE_PATH),
    },
  ];

  const settingsMenus = [
    {
      text: "Settings",
      icon: <SettingsIcon />,
      onClick: () => router.push("/settings"),
    },
    {
      text: loggedInUser?.name ?? "Profile",
      icon: (
        <Avatar
          alt={loggedInUser?.name ?? ""}
          src={loggedInUser?.picture ?? ""}
          sx={{ width: 20, height: 20 }}
        />
      ),
      onClick: () => router.push("/profile"),
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: () => router.push(LOGOUT_PATH),
    },
  ];

  const loginMenus = [
    {
      text: "Login",
      icon: <ProfileIcon />,
      onClick: () => router.push(LOGIN_PATH),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>Agnos Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            Agnos Cloud
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {homeMenus.map((menu) => (
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
              <ListItemText
                primary={menu.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
          {loggedInUser &&
            mainMenus.map((menu) => (
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
                <ListItemText
                  primary={menu.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
        </List>
        <Divider />
        {loggedInUser && (
          <List>
            {settingsMenus.map((menu) => (
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
                <ListItemText
                  primary={menu.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
        {!loggedInUser && (
          <List>
            {loginMenus.map((menu) => (
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
                <ListItemText
                  primary={menu.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
