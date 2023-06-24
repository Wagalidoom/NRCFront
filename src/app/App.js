import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from 'react';
import { EthereumProvider } from "../context/ethereumProvider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import muiTheme from '../assets/styles/muiTheme';
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
export const ThemeContext = React.createContext(null)
function App() {
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') && localStorage.getItem('theme') === 'Light Theme' ? lightTheme : darkTheme)
    return (
        // <ThirdwebProvider activeChain="localhost">
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
        // </ThirdwebProvider>
    );
}

export default App;
