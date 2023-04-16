import { Alert, Snackbar } from "@mui/material";
import type { InvocationType } from "@constants/invocation";
import type { LogType } from "@constants/log";
import { ToastPosition } from "@types";

export interface ToastProps {
  message: string | string[];
  open: boolean;
  position?: ToastPosition;
  type?: InvocationType | LogType;
  onClose: () => void;
}

const Toast = ({ message, open, type, position = ["top", "right"], onClose }: ToastProps) => {
  return (
    <Snackbar
      autoHideDuration={5000}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: position.includes("top") ? "top" : "bottom",
        horizontal: position.includes("left") ? "left" : position.includes("right") ? "right" : "center",
      }}
    >
      <Alert
        onClose={onClose}
        // @ts-ignore
        severity={String(type || "info").toLowerCase()}
        sx={{ width: "100%" }}
      >
        {Array.isArray(message)
          ? message.map((m, i) => <div key={i}>{m}</div>)
          : typeof message === "undefined"
          ? "undefined"
          : message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
