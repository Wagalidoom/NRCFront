import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import HomeV2 from "../pages/homeV2";
import HomeV3 from "../pages/homeV3";
import Blogs from "../pages/blogs";
import BlogDetails from "../pages/blogDetails";
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
        <Route path="/home-two" element={<HomeV2 />} />
        <Route path="/home-three" element={<HomeV3 />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/post" element={<BlogDetails />} />
      </Routes>
    </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
