import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "routes";
import themes from "themes";
import NavigationScroll from "layout/NavigationScroll";
import Login from "views/pages/authentication/authentication3/Login3";
import { MyContext } from "store/useContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const localStorageLogin = localStorage.getItem("login");
    if (localStorageLogin) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    if (login) {
      localStorage.setItem("login", "true");
    } else {
      localStorage.removeItem("login");
    }
  }, [login]);

  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <MyContext.Provider value={{ login, setLogin }}>
            {(!login && <Login setLogin={setLogin} />) || <Routes />}
          </MyContext.Provider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
