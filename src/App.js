import React from 'react';
import {defaultTheme} from "styles";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "pages/Home";
import Error from "pages/Error";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ResetPassword from "pages/ResetPassword";
import useAuth from "auth/useAuth";

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
    const {auth, } = useAuth();
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
                            <Login/>
                        )
                    }
                    />
                {/* non-protected routes */}
                <Route path={'/'} element={<Navigate to={HOME}/>}/>
                <Route path={HOME} element={<Home/>}/>
                <Route path={SIGNUP} element={<SignUp/>}/>
                <Route path={RESET_PASSWORD} element={<ResetPassword/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </ThemeProvider>
        </>
    );
}

export default App;
