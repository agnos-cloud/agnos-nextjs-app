import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Avatar,
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
import router from "next/router";

import { DESIGNS_PATH, FUNCTIONS_PATH, LOGOUT_PATH, PLUGINS_PATH, STORE_PATH, TEAMS_PATH } from "@constants/paths";
import { useUser } from "@auth0/nextjs-auth0";
import { DRAWER_WIDTH } from "@constants/dimensions";
import { useApp } from "@hooks/base";

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

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
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

function Drawer() {
  const theme = useTheme();
  const { user } = useUser();
  const { drawerIsOpen, setDrawerIsOpen } = useApp();

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const mainMenus = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Designs",
      icon: <DesignsIcon />,
      path: DESIGNS_PATH,
    },
    {
      text: "Plugins",
      icon: <PluginsIcon />,
      path: PLUGINS_PATH,
    },
    {
      text: "Functions",
      icon: <FunctionsIcon />,
      path: FUNCTIONS_PATH,
    },
    {
      text: "Teams",
      icon: <TeamsIcon />,
      path: TEAMS_PATH,
    },
    {
      text: "Marketplace",
      icon: <MarketIcon />,
      path: STORE_PATH,
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
      path: "/profile",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
    {
      text: "Sign out",
      icon: <LogoutIcon />,
      path: LOGOUT_PATH,
    },
  ];

  return (
    <StyledDrawer variant="permanent" open={drawerIsOpen}>
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
              justifyContent: drawerIsOpen ? "initial" : "center",
              px: 2.5,
            }}
            selected={router.pathname === menu.path}
            onClick={() => router.push(menu.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerIsOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.text} sx={{ opacity: drawerIsOpen ? 1 : 0 }} />
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
              justifyContent: drawerIsOpen ? "initial" : "center",
              px: 2.5,
            }}
            selected={router.pathname === menu.path}
            onClick={() => router.push(menu.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerIsOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.text} sx={{ opacity: drawerIsOpen ? 1 : 0 }} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
}

export default Drawer;
