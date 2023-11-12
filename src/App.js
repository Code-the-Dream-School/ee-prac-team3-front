import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import useAuth from "auth/useAuth";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {defaultTheme} from "assets/styles";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ResetPassword from "pages/ResetPassword";
import Footer from "components/Footer";
import Error from "pages/Error";
import Home from "./pages/Home/Home";
import highlight_1 from '../src/assets/images/highlight_1.svg';
import highlight_2 from '../src/assets/images/highlight_2.svg';
import highlight_3 from '../src/assets/images/highlight_3.svg';
import highlight_4 from '../src/assets/images/highlight_4.svg';

export const projectTeam = [
    {
        name: 'Katsiaryna',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: 'frontend team',
        gitHub: 'https://github.com/katsiarynalashcheuskaya'
    },
    {
        name: 'Alina',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: 'backend team',
        gitHub: 'https://github.com/npnote8'
    },
    {
        name: 'David',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: 'frontend team',
        gitHub: 'https://github.com/DavidGslade86'
    },
    {
        name: 'Bino',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: 'backend team',
        gitHub: 'https://github.com/Bino26'
    },
    {
        name: 'Eva',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: 'frontend team',
        gitHub: 'https://github.com/evaw277'
    },
]
export const highlights = [
    {
        text: 'Effective knowledge testing',
        image: highlight_1,
    },
    {
        text: 'Preparing for a job interview',
        image: highlight_2,
    },
    {
        text: 'Improving coding skills',
        image: highlight_3,
    },
    {
        text: 'Notes for productive studying',
        image: highlight_4,
    }
]

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
                <Route path={HOME} element={<Home team={projectTeam} highlights={highlights}/>}/>
                <Route path={SIGNUP} element={<SignUp/>}/>
                <Route path={RESET_PASSWORD} element={<ResetPassword/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
            <Footer/>
        </ThemeProvider>
        </>
    );
}

export default App;
