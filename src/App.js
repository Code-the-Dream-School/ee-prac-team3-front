import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from 'assets/styles';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Footer from 'components/Footer';
import Error from 'pages/Error';

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
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
};

export const { HOME, LOGIN, SIGNUP, RESET_PASSWORD } = PATH;

export const port = `http://localhost:8000`;

function App() {
  const { auth } = useAuth();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Routes>
          {/* protected route */}
          <Route
            path={LOGIN}
            element={auth.loggedIn ? <Navigate to="/"></Navigate> : <Login />}
          />
          {/* non-protected routes */}
          <Route path={'/'} element={<Navigate to={HOME} />} />
          <Route path={HOME} element={<Home />} />
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
