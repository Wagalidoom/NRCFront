import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from "react";
import { ETHEREUM_RPC_URL, EthereumProvider } from "../context/ethereumProvider";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
} from "@thirdweb-dev/react";
import { Ethereum, Goerli } from "@thirdweb-dev/chains";
import muiTheme from "../assets/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
export const ThemeContext = React.createContext(null);
function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") &&
      localStorage.getItem("theme") === "Light Theme"
      ? lightTheme
      : darkTheme
  );
  return (
    <ThirdwebProvider sdkOptions={{
      readonlySettings: {
        rpcUrl: ETHEREUM_RPC_URL, // force read calls to go through your own RPC url
        chainId: 5, // reduce RPC calls by specifying your chain ID
      },
    }} activeChain={{...Goerli}} supportedChains={[Goerli]} supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect({
          projectId: "8bced1683739a0bf52bbb56180e49a76",
        }),
        safeWallet()]}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <MuiThemeProvider theme={muiTheme}>
          <StyledThemeProvider theme={theme}>
            <EthereumProvider>
              <Routes>
                <Route path="/" element={<HomeV1 />} exact />
              </Routes>
            </EthereumProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </ThirdwebProvider>
  );
}

export default App;
