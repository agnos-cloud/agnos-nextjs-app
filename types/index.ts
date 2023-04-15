import { JSXElementConstructor, MouseEventHandler, ReactElement } from "react";

export type Obj = Record<string, unknown>;

export type Query = {
  "@page"?: number;
  "@size"?: number;
  "@sort"?: Record<string, "asc" | "desc">;
  "@include"?: Array<{ path: string; select?: string }>;
} & Obj;

export type AppContext = {
  dialogActions: DialogAction[];
  dialogContent: ReactElement<any, string | JSXElementConstructor<any>> | null;
  dialogIsOpen: boolean;
  dialogTitle: string;
  drawerIsOpen: boolean;
  setDialogActions: (_: DialogAction[]) => void;
  setDialogContent: (_: ReactElement<any, string | JSXElementConstructor<any>>) => void;
  setDrawerIsOpen: (_: boolean) => void;
  openDialog: (_: DialogOptions) => void;
  closeDialog: () => void;
  togglePaletteMode: () => void;
};

export type DialogOptions = {
  title?: string;
  content: ReactElement<any, string | JSXElementConstructor<any>> | null;
  actions?: DialogAction[];
};

export type DialogAction = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};
