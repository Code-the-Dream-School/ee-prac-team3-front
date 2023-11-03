import React from 'react';
import {defaultTheme} from "styles";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "pages/HomePage";
import ErrorPage from "pages/ErrorPage";
import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import useAuth from "./auth/useAuth";

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

export const {HOME, LOGIN, SIGNUP, RESET_PASSWORD} = PATH;

function App() {
    // setAuth will be used for logout
    const {auth, setAuth} = useAuth();
    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Routes>
                {/* protected route */}
                <Route
                    path={LOGIN}
                    element={
                        auth.loggedIn ? (
                            <Navigate to="/"></Navigate>
                        ) : (
                            <LoginPage/>
                        )
                    }
                    />
                {/* non-protected routes */}
                <Route path={'/'} element={<Navigate to={HOME}/>}/>
                <Route path={HOME} element={<HomePage/>}/>
                <Route path={SIGNUP} element={<SignUpPage/>}/>
                <Route path={RESET_PASSWORD} element={<ResetPasswordPage/>}/>
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
        </ThemeProvider>
        </>
    );
}

export default App;
