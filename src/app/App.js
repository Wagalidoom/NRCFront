import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet, goerli } from "viem/chains";

import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from "react";
import {
  ETHEREUM_RPC_URL,
  EthereumProvider,
} from "../context/ethereumProvider";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
} from "@thirdweb-dev/react";
import { Ethereum, Goerli } from "@thirdweb-dev/chains";
import muiTheme from "../assets/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
export const ThemeContext = React.createContext(null);

const projectId = "0626848077ce83d0eb850a0d03614cd3";

const metadata = {
  name: "NumberRunnerClub",
  description: "NumberRunnerClub",
  url: "https://nrclub.xyz",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") &&
      localStorage.getItem("theme") === "Light Theme"
      ? lightTheme
      : darkTheme
  );
  return (
    <WagmiConfig config={wagmiConfig}>
      <ThirdwebProvider
        sdkOptions={{
          readonlySettings: {
            rpcUrl: ETHEREUM_RPC_URL,
            chainId: 5,
          },
        }}
        activeChain={{ ...Goerli }}
        supportedChains={[Goerli]}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect({
            projectId: "0626848077ce83d0eb850a0d03614cd3",
            dappMetadata: {
              name: "Number Runner Club",
              url: "https://nrc.xyz",
              description: "Number Runner Club",
              logoUrl: "https://thirdweb.com/favicon.ico",
            },
          }),
          trustWallet(),
        ]}
        clientId="c82bdb2a716de4c99531f01a1c9fdf40"
      >
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
    </WagmiConfig>
  );
}

export default App;
