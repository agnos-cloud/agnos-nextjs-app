import { Alert, Snackbar } from "@mui/material";
import type { LogType } from "../constants/log";

export interface ToastProps {
  message: string;
  open: boolean;
  position?: Array<"bottom" | "center" | "left" | "right" | "top">;
  type?: LogType;
  onClose: () => void;
}

const Toast = ({
  message,
  open,
  type,
  position = ["top", "center"],
  onClose,
}: ToastProps) => {
  return (
    <Snackbar
      autoHideDuration={5000}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: position.includes("top") ? "top" : "bottom",
        horizontal: position.includes("left")
          ? "left"
          : position.includes("right")
          ? "right"
          : "center",
      }}
    >
      <Alert
        onClose={onClose}
        // @ts-ignore
        severity={String(type || "info").toLowerCase()}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
