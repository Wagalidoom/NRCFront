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
        rpcUrl: ETHEREUM_RPC_URL,
        chainId: 5,
      },
    }} activeChain={{...Goerli}} supportedChains={[Goerli]} supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect({
          projectId: "0626848077ce83d0eb850a0d03614cd3",
        }),
        safeWallet()]}
        clientId="d21cf762a50d961e73495ccf8e83deb8">
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
