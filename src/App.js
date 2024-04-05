import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import Login from "views/pages/authentication/authentication3/Login3";
import { MyContext } from "store/useContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// ==============================|| APP ||============================== //

const App = () => {
  const [login, setLogin] = useState(false);
  console.log("login: ", login);
  const navigate = useNavigate(); // Initialize useNavigate

  const navigateToRegister = () => {
    navigate("/pages/register/register3");
    setLogin(false);
  };

  const customization = useSelector((state) => state.customization);
  const [local, setLocal] = useState(false);
  console.log("local: ", local);
  useEffect(() => {
    const data = localStorage.getItem("login");
    console.log("data: ", data);
    setLocal(data);
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <MyContext.Provider value={{ login, setLogin }}>
            {!local ? (
              <Login navigateToRegister={navigateToRegister} />
            ) : (
              <Routes />
            )}
          </MyContext.Provider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
