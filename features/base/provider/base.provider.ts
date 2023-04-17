import { LogType } from "@constants/log";
import { AppContext, DialogOptions, ToastOptions } from "@types";
import React from "react";

const AppContext = React.createContext<AppContext>({
  dialogActions: [],
  dialogContent: null,
  dialogIsOpen: false,
  dialogTitle: "",
  dialogIsLoading: false,
  drawerIsOpen: false,
  toastIsOpen: false,
  toastMessage: "",
  toastPosition: ["top", "right"],
  toastType: LogType.INFO,
  setDialogIsLoading: (_: boolean) => {},
  setDrawerIsOpen: (_: boolean) => {},
  openDialog: (_: DialogOptions) => {},
  closeDialog: () => {},
  openToast: (_: ToastOptions) => {},
  closeToast: () => {},
  togglePaletteMode: () => {},
});
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
