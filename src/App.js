import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "auth/useAuth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "assets/styles";
import Main from "pages/Main";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ResetPassword from "pages/ResetPassword";
import Footer from "components/Footer";
import Error from "pages/Error";
import Home from "pages/Home/Home";
import highlight_1 from "./assets/images/highlight_effective_knowledge_testing.svg";
import highlight_2 from "./assets/images/highlight_preparing_for_a_job_interview.svg";
import highlight_3 from "./assets/images/highlight_improving_coding_skills.svg";
import highlight_4 from "./assets/images/highlight_notes_for_productive_studying.svg";
import CustomizedSnackbars from "components/Snackbar";

const teamRoles = {
  BACKEND_TEAM: "backend team",
  FRONTEND_TEAM: "frontend team",
};
const { BACKEND_TEAM, FRONTEND_TEAM } = teamRoles;
export const projectTeam = [
  {
    name: "Katsiaryna",
    imageURL:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    role: FRONTEND_TEAM,
    gitHub: "https://github.com/katsiarynalashcheuskaya",
  },
  {
    name: "Alina",
    imageURL:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    role: BACKEND_TEAM,
    gitHub: "https://github.com/npnote8",
  },
  {
    name: "David",
    imageURL:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    role: FRONTEND_TEAM,
    gitHub: "https://github.com/DavidGslade86",
  },
  {
    name: "Bino",
    imageURL:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    role: BACKEND_TEAM,
    gitHub: "https://github.com/Bino26",
  },
  {
    name: "Eva",
    imageURL:
      "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    role: FRONTEND_TEAM,
    gitHub: "https://github.com/evaw277",
  },
];
export const highlights = [
  {
    text: "Effective knowledge testing",
    image: highlight_1,
  },
  {
    text: "Preparing for a job interview",
    image: highlight_2,
  },
  {
    text: "Improving coding skills",
    image: highlight_3,
  },
  {
    text: "Notes for productive studying",
    image: highlight_4,
  },
];

const PATH = {
  /*
    // For further use:
    QUIZZES: '/quiz-app',
    QUIZ: '/quiz',
    ABOUT: '/about',
    NOTES: '/notes,
    UNAUTHORIZED: '/unauthorized',
    FAVORITES: '/favorites',
    CONFIRMATION: '/confirmation',
    LOGOUT: '/logout',
    USER_SETTINGS: '/user-settings'
    */
  HOME: "/home",
  MAIN: "/quizzes",
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
};

export const { HOME, MAIN, LOGIN, SIGNUP, RESET_PASSWORD } = PATH;

function App() {
  const { auth } = useAuth();
  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    severity: "",
    message: "",
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <CustomizedSnackbars
          open={snackbar.isOpened}
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prevSnackbar) => ({
              ...prevSnackbar,
              isOpened: false,
            }))
          }
          dismissible
          message={snackbar.message}
        ></CustomizedSnackbars>
        <Routes>
          {/* protected route */}
          <Route
            path={LOGIN}
            element={auth.loggedIn ? <Navigate to="/"></Navigate> : <Login />}
          />
          {/* non-protected routes */}
          <Route path={"/"} element={<Navigate to={HOME} />} />
          <Route
            path={HOME}
            element={
              <Home
                snackbar={setSnackbar}
                team={projectTeam}
                highlights={highlights}
              />
            }
          />
          <Route path={MAIN} element={<Main />} />
          <Route path={SIGNUP} element={<SignUp />} />
          <Route path={RESET_PASSWORD} element={<ResetPassword />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
