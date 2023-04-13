import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Person as ProfileIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import router from "next/router";
import { LOGIN_PATH, LOGOUT_PATH } from "@constants/paths";
import { useUser } from "@auth0/nextjs-auth0";
import { useSettings } from "@hooks/settings";
import { DRAWER_WIDTH } from "@constants/dimensions";
import { useApp } from "@hooks/base";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBar() {
  const theme = useTheme();
  const { drawerIsOpen, setDrawerIsOpen, togglePaletteMode } = useApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();
  const { colorMode: cm, setColorMode } = useSettings(user);

  React.useEffect(() => {
    if (theme.palette.mode !== (cm.toLocaleLowerCase() as "light" | "dark")) {
      togglePaletteMode();
    }
  }, [user, cm, theme, togglePaletteMode]);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    <StyledAppBar position="fixed" open={drawerIsOpen}>
      <Toolbar sx={{ mr: 2 }}>
        {user && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(drawerIsOpen && { display: "none" }),
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
              togglePaletteMode();
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
              <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {userMenus.map((menu) => (
                  <MenuItem key={menu.text} onClick={menu.onClick}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerIsOpen ? 3 : "auto",
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
    </StyledAppBar>
  );
}
