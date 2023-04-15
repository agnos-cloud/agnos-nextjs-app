import { MouseEventHandler } from "react";

export type Obj = Record<string, unknown>;

export type Query = {
  "@page"?: number;
  "@size"?: number;
  "@sort"?: Record<string, "asc" | "desc">;
  "@include"?: Array<{ path: string; select?: string }>;
} & Obj;

export type AppContext = {
  dialogActions: DialogAction[];
  dialogIsOpen: boolean;
  dialogTitle: string;
  drawerIsOpen: boolean;
  setDialogActions: (_: DialogAction[]) => void;
  setDrawerIsOpen: (_: boolean) => void;
  openDialog: (_: DialogOptions) => void;
  closeDialog: () => void;
  togglePaletteMode: () => void;
};

export type DialogOptions = {
  title?: string;
  actions?: DialogAction[];
};

export type DialogAction = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};
