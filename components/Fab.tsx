import { Fab as FabButton, SxProps, useTheme, Zoom } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { MouseEventHandler } from "react";

export interface FabProps {
  position?: Array<("bottom" | "left" | "right" | "top")>;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Fab = ({ position = ["bottom", "right"], onClick }: FabProps) => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    bottom: position.includes("bottom") ? 16 : "auto",
    left: position.includes("left") ? theme.spacing(8) + 16 : "auto",
    margin: 0,
    position: "fixed",
    right: position.includes("right") ? 16 : "auto",
    top: position.includes("top") ? theme.spacing(8) + 16 : "auto",
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
