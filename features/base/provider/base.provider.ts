import { AppContext, DialogOptions } from "@types";
import React from "react";

const AppContext = React.createContext<AppContext>({
  dialogActions: [],
  dialogContent: null,
  dialogIsOpen: false,
  dialogTitle: "",
  dialogIsLoading: false,
  drawerIsOpen: false,
  setDialogIsLoading: (_: boolean) => {},
  setDrawerIsOpen: (_: boolean) => {},
  openDialog: (_: DialogOptions) => {},
  closeDialog: () => {},
  togglePaletteMode: () => {},
});
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
