import { InvocationType } from "@constants/invocation";
import { LogType } from "@constants/log";
import { Breakpoint } from "@mui/material";
import { JSXElementConstructor, MouseEventHandler, ReactElement } from "react";

export type Obj = Record<string, unknown>;

export type Query = {
  "@page"?: number;
  "@size"?: number;
  "@sort"?: Record<string, "asc" | "desc">;
  "@include"?: Array<{ path: string; select?: string }>;
} & Obj;

export type ToastPosition = Array<"bottom" | "center" | "left" | "right" | "top">;

export type AppContext = {
  dialogActions: DialogAction[];
  dialogContent: ReactElement<any, string | JSXElementConstructor<any>> | null;
  dialogIsLoading: boolean;
  dialogIsOpen: boolean;
  dialogTitle: string;
  drawerIsOpen: boolean;
  toastIsOpen: boolean;
  toastMessage: string | string[];
  toastPosition: ToastPosition;
  toastType: InvocationType | LogType;
  setDialogIsLoading: (_: boolean) => void;
  setDrawerIsOpen: (_: boolean) => void;
  openDialog: (_: DialogOptions) => void;
  closeDialog: () => void;
  openToast: (_: ToastOptions) => void;
  closeToast: () => void;
  togglePaletteMode: () => void;
};

export type DialogOptions = {
  title?: string;
  content: ReactElement<any, string | JSXElementConstructor<any>> | null;
  actions?: DialogAction[];
  loading?: boolean;
  maxWidth?: false | Breakpoint | undefined;
};

export type DialogAction = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type ToastOptions = {
  message?: string | string[];
  position?: ToastPosition;
  type?: InvocationType | LogType;
};
