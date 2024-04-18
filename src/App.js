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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [login, setLogin] = useState(false);
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const handleGetApi = () => {
    const studentFetch = fetch(
      "https://student-monitoring-backend.onrender.com/api/students/getAllStudents"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        throw error; // Re-throw the error to be caught by Promise.all()
      });

    const facultyFetch = fetch(
      "https://student-monitoring-backend.onrender.com/api/faculty/getAllFaculty"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching faculty data:", error);
        throw error; // Re-throw the error to be caught by Promise.all()
      });

    Promise.all([studentFetch, facultyFetch])
      .then(([studentData, facultyData]) => {
        // Both requests succeeded, update the state with the data
        setStudentData(studentData);
        setFacultyData(facultyData);
      })
      .catch((error) => {
        // At least one request failed, handle the error here
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetApi();
    const localStorageLogin = localStorage.getItem("login");
    if (localStorageLogin) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    if (login === true) {
      localStorage.setItem("login", "true");
    } else {
      localStorage.removeItem("login");
    }
  }, []);

  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <MyContext.Provider
            value={{
              login,
              setLogin,
              facultyData,
              studentData,
              setFacultyData,
              setStudentData,
            }}
          >
            {(!login && <Login setLogin={setLogin} />) || <Routes />}
          </MyContext.Provider>
          <ToastContainer />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
