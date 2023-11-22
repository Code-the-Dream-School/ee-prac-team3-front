import React, {useCallback, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import useAuth from "auth/useAuth";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import customColors, {defaultTheme} from "assets/styles";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ResetPassword from "pages/ResetPassword";
import Footer from "components/Footer";
import Error from "pages/Error";
import Home from "pages/Home/Home";
import highlight_1 from './assets/images/highlight_effective_knowledge_testing.svg';
import highlight_2 from './assets/images/highlight_preparing_for_a_job_interview.svg';
import highlight_3 from './assets/images/highlight_improving_coding_skills.svg';
import highlight_4 from './assets/images/highlight_notes_for_productive_studying.svg';
import CustomizedSnackbars from "components/Snackbar";
import Header from "./components/Header/Header";
import SettingsRoundedIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FakeMainPageContainer from "./pages/TemporaryMainPage";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import Notes from "./pages/Notes";
import Library from "./pages/Library";
import UserSettings from "./pages/UserSettings";

const PATH = {
    /*
    // For further use:
    UNAUTHORIZED: '/unauthorized',
    CONFIRMATION: '/confirmation'
    */
    HOME: '/home',
    LOGIN: '/login',
    SIGNUP: '/signup',
    RESET_PASSWORD: '/reset-password',
    LOGOUT: '/logout',
    USER_SETTINGS: '/settings',
    ABOUT: '/about',
    QUIZZES: '/quiz-app',
    ERROR: '/error',
    FAVORITES: '/favorites',
    NOTES: '/notes',
    LIBRARY: '/library',
    QUIZ: '/quiz',
};

export const {
    HOME,
    LOGIN,
    SIGNUP,
    RESET_PASSWORD,
    QUIZZES,
    USER_SETTINGS,
    LOGOUT,
    ABOUT,
    ERROR,
    FAVORITES,
    NOTES,
    LIBRARY,
    QUIZ
} = PATH;

const teamRoles = {
    BACKEND_TEAM: 'backend team',
    FRONTEND_TEAM: 'frontend team'
}
const {BACKEND_TEAM, FRONTEND_TEAM} = teamRoles;
export const projectTeam = [
    {
        id: '1',
        name: 'Katsiaryna',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: FRONTEND_TEAM,
        gitHub: 'https://github.com/katsiarynalashcheuskaya'
    },
    {
        id: '2',
        name: 'Alina',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: BACKEND_TEAM,
        gitHub: 'https://github.com/npnote8'
    },
    {
        id: '3',
        name: 'David',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: FRONTEND_TEAM,
        gitHub: 'https://github.com/DavidGslade86'
    },
    {
        id: '4',
        name: 'Bino',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: BACKEND_TEAM,
        gitHub: 'https://github.com/Bino26'
    },
    {
        id: '5',
        name: 'Eva',
        imageURL: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
        role: FRONTEND_TEAM,
        gitHub: 'https://github.com/evaw277'
    },
]
export const highlights = [
    {
        id: 'highlight 1',
        text: 'Effective knowledge testing',
        image: highlight_1,
    },
    {
        id: 'highlight 2',
        text: 'Preparing for a job interview',
        image: highlight_2,
    },
    {
        id: 'highlight 3',
        text: 'Improving coding skills',
        image: highlight_3,
    },
    {
        id: 'highlight 4',
        text: 'Notes for productive studying',
        image: highlight_4,
    }
]

const profileSettings = [
    {
        title: 'Account',
        icon: <SettingsRoundedIcon sx={{color:customColors.blackLight}}/>,
        path: USER_SETTINGS
    },
    {
        title: 'Logout',
        icon: <LogoutRoundedIcon sx={{color:customColors.blackLight}}/>,
        path: LOGOUT
    }
];

const userData = {
    firstName: "Katsiaryna",
    lastName: "Lashcheuskaya",
    email: "test@test.com",
}

function App() {
    const {auth,} = useAuth();
    const [snackbar, setSnackbar] = useState({
        isOpened: false,
        severity: "",
        message: "",
    });
    const [quizzes] = useState([
        {
            id: 'react-basic',
            title: 'React Basic',
            category: 'react',
            level: 'basic',
            labels: ['frontend']
        },
        {
            id: 'react-middle',
            title: 'React Middle',
            category: 'react',
            level: 'middle',
            labels: ['frontend']
        },
        {
            id: 'js-basic',
            title: 'JS Basic',
            category: 'javascript',
            level: 'basic',
            labels: ['frontend', 'backend']
        },
        {
            id: 'js-functions',
            title: 'JS Functions',
            category: 'javascript',
            level: 'basic',
            labels: ['frontend', 'backend']
        },
        {
            id: 'js-middle',
            title: 'JS Middle',
            category: 'javascript',
            level: 'middle',
            labels: ['frontend', 'backend']
        },
        {
            id: 'data-structures',
            title: 'Data structures',
            category: 'data structure',
            level: 'middle',
            labels: ['frontend', 'backend']
        },
        {
            id: 'js-arrays',
            title: 'JS Arrays',
            category: 'javascript',
            level: 'basic',
            labels: ['frontend', 'backend']
        },
        {
            id: 'js-promises',
            title: 'JS Promises',
            category: 'javascript',
            level: 'middle',
            labels: ['frontend', 'backend']
        }
    ]);
    const [favoriteQuizzes] = useState([
        {
            id: 'react-middle',
            title: 'React Middle',
            category: 'react',
            level: 'middle',
            labels: ['frontend']
        },
        {
            id: 'js-arrays',
            title: 'JS Arrays',
            category: 'javascript',
            level: 'basic',
            labels: ['frontend', 'backend']
        },
    ]);
    const [filterVisible, setFilterVisible] = useState(false);


    const useFilterState = () => {
        const [activeFilters, setActiveFilters] = useState({
            levels: [],
            categories: [],
            labels: [],
        });

        const setActiveFilter = useCallback((type, filter) => {
            setActiveFilters(prevFilters => ({
                ...prevFilters,
                [type]: toggleFilter(prevFilters[type], filter),
            }));
        }, []);

        const toggleFilter = (prevFilters, filter) => (
            filter
                ? (prevFilters.includes(filter) ? prevFilters.filter(f => f !== filter) : [...prevFilters, filter])
                : []
        );
        const location = useLocation();
        useEffect(() => {
            // Reset activeFilters when the route changes
            setActiveFilters({
                levels: [],
                categories: [],
                labels: [],
            });
        }, [location.pathname]);

        return {activeFilters, setActiveFilter};
    };


    const {activeFilters, setActiveFilter} = useFilterState();

    const changeFilter = useCallback((filterType, filter) => {
        setActiveFilter(filterType, filter);
    }, [setActiveFilter]);

    const toggleFilterVisibility = () => {
        setFilterVisible((prevVisible) => !prevVisible);
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <CustomizedSnackbars
                    open={snackbar.isOpened}
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() =>
                        setSnackbar((prevSnackbar) => ({...prevSnackbar, isOpened: false}))
                    }
                    dismissible
                    message={snackbar.message}
                ></CustomizedSnackbars>
                <Header profileSettings={profileSettings} userData={userData} auth={auth} filterVisible={filterVisible}
                        onFilterIconClick={toggleFilterVisibility}/>
                <NavBar/>
                <Routes>
                    {/* protected route */}
                    <Route
                        path={LOGIN}
                        element={
                            auth.loggedIn ? (
                                <Navigate to="/"></Navigate>
                            ) : (
                                <Login/>
                            )}
                    />
                    {/* non-protected routes */}
                    <Route path={'/'} element={<Navigate to={HOME}/>}/>
                    <Route path={HOME}
                           element={<Home snackbar={setSnackbar} team={projectTeam} highlights={highlights}/>}/>
                    <Route path={SIGNUP} element={<SignUp/>}/>
                    <Route path={ABOUT} element={<About/>}/>
                    <Route path={QUIZZES}
                           element={<FakeMainPageContainer quizzes={quizzes} filterVisible={filterVisible}
                                                           changeFilter={changeFilter}
                                                           activeFilters={activeFilters}
                           />}/>

                    <Route path={RESET_PASSWORD} element={<ResetPassword/>}/>
                    <Route path={FAVORITES}
                           element={<Favorites favoriteQuizzes={favoriteQuizzes} filterVisible={filterVisible}
                                               changeFilter={changeFilter} activeFilters={activeFilters}/>}/>
                    <Route path={NOTES} element={<Notes/>}/>
                    <Route path={LIBRARY} element={<Library/>}/>
                    <Route path={ERROR} element={<Error/>}/>
                    <Route path={USER_SETTINGS} element={<UserSettings/>}/>
                    <Route path="/*" element={<Navigate to={ERROR}></Navigate>}/>
                </Routes>
                <Footer/>
            </ThemeProvider>
        </>
    );

}

export default App;
