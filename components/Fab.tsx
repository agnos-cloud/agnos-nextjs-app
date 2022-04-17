import { Fab as FabButton, SxProps, useTheme, Zoom } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { MouseEventHandler } from "react";

export interface FabProps {
  location?: Array<("bottom" | "left" | "right" | "top")>;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Fab = ({ location = ["bottom", "right"], onClick }: FabProps) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    bottom: location.includes("bottom") ? 16 : "auto",
    left: location.includes("left") ? theme.spacing(8) + 16 : "auto",
    margin: 0,
    position: "fixed",
    right: location.includes("right") ? 16 : "auto",
    top: location.includes("top") ? theme.spacing(8) + 16 : "auto",
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
