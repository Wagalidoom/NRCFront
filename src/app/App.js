import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from 'react';
import { EthereumProvider } from "../context/ethereumProvider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
export const ThemeContext = React.createContext(null)
function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') && localStorage.getItem('theme') === 'Light Theme' ? lightTheme : darkTheme)
  return (
    <ThirdwebProvider activeChain="localhost">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme}>
          <EthereumProvider>
            <Routes>
              <Route path="/" element={<HomeV1 />} exact />
            </Routes>
          </EthereumProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ThirdwebProvider>
  );
}

export default App;
