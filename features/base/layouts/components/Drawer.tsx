import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccessTime as RecentIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  GridViewRounded as ComponentsIcon,
  Workspaces as SharedProjectsIcon,
  Home as HomeIcon,
  Lan as ProjectsIcon,
  Settings as SettingsIcon,
  StarOutline as FavoritesIcon,
  Store as MarketIcon,
  CorporateFare as OrgsIcon,
} from "@mui/icons-material";
import router from "next/router";

import {
  SHARED_PATH,
  STORE_PATH,
  ORGS_PATH,
  RECENT_PATH,
  FAVORITES_PATH,
  COMPONENTS_PATH,
  PROJECTS_PATH,
} from "@constants/paths";
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
  const { drawerIsOpen, setDrawerIsOpen } = useApp();

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const personalMenus = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Shared Space",
      icon: <SharedProjectsIcon />,
      path: SHARED_PATH,
    },
    {
      text: "Projects",
      icon: <ProjectsIcon />,
      path: PROJECTS_PATH,
    },
    {
      text: "Components",
      icon: <ComponentsIcon />,
      path: COMPONENTS_PATH,
    },
  ];

  const orgMenus = [
    {
      text: "Organizations",
      icon: <OrgsIcon />,
      path: ORGS_PATH,
    },
    {
      text: "Marketplace",
      icon: <MarketIcon />,
      path: STORE_PATH,
    },
  ];

  const miscMenus = [
    {
      text: "Recent",
      icon: <RecentIcon />,
      path: RECENT_PATH,
    },
    {
      text: "Favorites",
      icon: <FavoritesIcon />,
      path: FAVORITES_PATH,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
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
        {personalMenus.map((menu) => (
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
        {orgMenus.map((menu) => (
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
        {miscMenus.map((menu) => (
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
