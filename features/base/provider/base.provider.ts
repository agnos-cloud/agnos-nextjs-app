import React from "react";

const AppContext = React.createContext({ openDrawer: false, setOpenDrawer: (_: boolean) => {} });
const AppProvider = AppContext.Provider;

export const useApp = () => React.useContext(AppContext);

export default AppProvider;
