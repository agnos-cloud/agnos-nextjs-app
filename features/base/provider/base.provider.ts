import { AppContext, DialogAction, DialogOptions } from "@types";
import React from "react";

const AppContext = React.createContext<AppContext>({
  dialogActions: [],
  dialogIsOpen: false,
  dialogTitle: "",
  drawerIsOpen: false,
  setDialogActions: (_: DialogAction[]) => {},
  setDrawerIsOpen: (_: boolean) => {},
  openDialog: (_: DialogOptions) => {},
  closeDialog: () => {},
  togglePaletteMode: () => {},
});
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
