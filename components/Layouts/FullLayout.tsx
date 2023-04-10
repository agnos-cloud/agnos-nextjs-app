import * as React from "react";
import { useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as DesignsIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  FlashOn as FunctionsIcon,
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

import {
  DESIGNS_PATH,
  FUNCTIONS_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  PLUGINS_PATH,
  STORE_PATH,
  TEAMS_PATH,
} from "../../constants/paths";
import { useUser } from "@auth0/nextjs-auth0";
import { useColorMode } from "../../providers/ColorModeProvider";
import { useSettings } from "../../hooks/settings.hooks";

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

function FullLayout({ children }: any) {
  const theme = useTheme();
  const colorMode = useColorMode();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();
  const { colorMode: cm, setColorMode } = useSettings(user);

  React.useEffect(() => {
    if (theme.palette.mode !== (cm.toLocaleLowerCase() as "light" | "dark")) {
      colorMode.toggleColorMode();
    }
  }, [user, cm, theme, colorMode]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>Agnos Cloud</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ mr: 2 }}>
          {user && (
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
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
            sx={{ flexGrow: 1 }}
          >
            Agnos Cloud
          </Typography>
          <div>
            {user && (
              <IconButton sx={{ ml: 1 }} onClick={() => router.push("/search")} color="inherit">
                <SearchIcon />
              </IconButton>
            )}
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => {
                theme.palette.mode === "dark" ? setColorMode("LIGHT") : setColorMode("DARK");
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {!user && (
              <IconButton sx={{ ml: 1 }} onClick={() => router.push(LOGIN_PATH)} color="inherit">
                <ProfileIcon />
              </IconButton>
            )}
            {user && (
              <>
                <IconButton
                  sx={{ ml: 1 }}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user?.picture ? (
                    <Avatar alt={user?.name ?? ""} src={user?.picture} sx={{ width: 20, height: 20 }} />
                  ) : (
                    <ProfileIcon />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {userMenus.map((menu) => (
                    <MenuItem key={menu.text} onClick={menu.onClick}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {menu.icon}
                      </ListItemIcon>
                      <ListItemText>{menu.text}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
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
  );
}

export default FullLayout;
