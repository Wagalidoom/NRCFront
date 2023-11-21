import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet, goerli } from "viem/chains";

import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import logo from "../assets/images/fav.png";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from "react";
import { EthereumProvider } from "../context/ethereumProvider";
import muiTheme from "../assets/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
export const ThemeContext = React.createContext(null);

const projectId = "0626848077ce83d0eb850a0d03614cd3";

const metadata = {
  name: "NumberRunnerClub",
  description: "NumberRunnerClub",
  url: "https://nrclub.xyz",
  icons: [logo],
};

const chains = [mainnet, goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    "--w3m-accent": "rgb(29, 155, 240)",
  },
});

function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") &&
      localStorage.getItem("theme") === "Light Theme"
      ? lightTheme
      : darkTheme
  );
  return (
    <WagmiConfig config={wagmiConfig}>
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
    </WagmiConfig>
  );
}

export default App;
