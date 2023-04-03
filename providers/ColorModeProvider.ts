import React from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const ColorModeProvider = ColorModeContext.Provider;

export const useColorMode = () => React.useContext(ColorModeContext);

export default ColorModeProvider;
