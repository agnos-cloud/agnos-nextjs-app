import React from "react";

const AppContext = React.createContext({
  drawerIsOpen: false,
  setDrawerIsOpen: (_: boolean) => {},
  togglePaletteMode: () => {},
});
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
