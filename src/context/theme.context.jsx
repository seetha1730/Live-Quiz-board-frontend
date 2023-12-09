import { createContext, useState } from "react";
import PropTypes from 'prop-types';
const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
ThemeProviderWrapper.propTypes = {
  children: PropTypes.node,
};


export { ThemeContext, ThemeProviderWrapper };