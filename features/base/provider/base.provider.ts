import { AppContext, DialogAction, DialogOptions } from "@types";
import React, { JSXElementConstructor, ReactElement } from "react";

const AppContext = React.createContext<AppContext>({
  dialogActions: [],
  dialogContent: null,
  dialogIsOpen: false,
  dialogTitle: "",
  drawerIsOpen: false,
  setDialogActions: (_: DialogAction[]) => {},
  setDialogContent: (_: ReactElement<any, string | JSXElementConstructor<any>> | null) => {},
  setDrawerIsOpen: (_: boolean) => {},
  openDialog: (_: DialogOptions) => {},
  closeDialog: () => {},
  togglePaletteMode: () => {},
});
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
