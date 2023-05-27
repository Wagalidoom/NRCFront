import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import React from 'react';
export const ThemeContext = React.createContext(null)
function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') && localStorage.getItem('theme') === 'Light Theme' ? lightTheme : darkTheme)
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomeV1 />} exact />
      </Routes>
    </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
