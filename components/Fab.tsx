import { Fab as FabButton, SxProps, useTheme, Zoom } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { MouseEventHandler } from "react";

export interface FabProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const fabStyle = {
  bottom: 16,
  left: "auto",
  margin: 0,
  position: "fixed",
  right: 16,
  top: "auto",
};

const Fab = ({ onClick }: FabProps) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fab = {
    color: "primary" as "primary",
    sx: fabStyle as SxProps,
    icon: <AddIcon />,
    label: "Add",
  };
  return (
    <Zoom
      key={fab.color}
      in={true}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}
      unmountOnExit
    >
      <FabButton
        sx={fab.sx}
        aria-label={fab.label}
        color={fab.color}
        onClick={onClick}
      >
        {fab.icon}
      </FabButton>
    </Zoom>
  );
};

export default Fab;
