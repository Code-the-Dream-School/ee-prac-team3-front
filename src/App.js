import React, { useCallback, useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import { CssBaseline, ThemeProvider } from '@mui/material';
import customColors, { defaultTheme } from 'assets/styles';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Footer from 'components/Footer';
import Error from 'pages/Error';
import Home from 'pages/Home/Home';
import QuizContent from 'pages/QuizUi/QuizContent';
import LogoutModal from 'components/LogoutModal';
import highlight_1 from './assets/images/highlight_effective_knowledge_testing.svg';
import highlight_2 from './assets/images/highlight_preparing_for_a_job_interview.svg';
import highlight_3 from './assets/images/highlight_improving_coding_skills.svg';
import highlight_4 from './assets/images/highlight_notes_for_productive_studying.svg';
import CustomizedSnackbars from 'components/Snackbar';
import Header from './components/Header/Header';
import SettingsRoundedIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Quizzes } from './pages/Main';
import { Favorites } from './pages/Main';
import About from './pages/About/About';
import NavBar from './components/NavBar';
import Notes from './pages/Notes';
import Library from './pages/Library';
import UserSettings from './pages/UserSettings';
import useFilterState from './components/filterState';
import reactJsLogo from './assets/images/react-logo-svgrepo-com.svg';
import jsLogo from './assets/images/js.svg';
// import Loading from './components/Loading';
import Box from '@mui/material/Box';
import {
  backendApiCall,
  authenticateUser,
  handleLogout,
} from './functions/exportFunctions';

const PATH = {
  /*
    // For further use:
    UNAUTHORIZED: '/unauthorized',
    CONFIRMATION: '/confirmation',
    LOGOUT: '/logout',
    */
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
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
  ABOUT,
  ERROR,
  FAVORITES,
  NOTES,
  LIBRARY,
  QUIZ,
} = PATH;

export const port = `http://localhost:8000`;

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
  },
];

const quizProgress = [
  {
    quizId: 'react-basic',
    attemptsCount: 1,
    bestScore: 80,
    lastScore: 50,
    progress: 50,
  },
  {
    quizId: 'react-intermediate',
    attemptsCount: 4,
    bestScore: 50,
    lastScore: 50,
    progress: 10,
  },
  {
    quizId: 'js-basic',
    attemptsCount: 3,
    bestScore: 90,
    lastScore: 30,
    progress: 80,
  },
  {
    quizId: 'js-functions',
    attemptsCount: 1,
    bestScore: 20,
    lastScore: 20,
    progress: 100,
  },
  {
    quizId: 'react-basic',
    attemptsCount: 1,
    bestScore: 80,
    lastScore: 50,
    progress: 50,
  },
  {
    quizId: 'react-intermediate',
    attemptsCount: 4,
    bestScore: 50,
    lastScore: 50,
    progress: 10,
  },
  {
    quizId: 'js-basic',
    attemptsCount: 3,
    bestScore: 90,
    lastScore: 30,
    progress: 80,
  },
  {
    quizId: 'js-functions',
    attemptsCount: 1,
    bestScore: 20,
    lastScore: 20,
    progress: 100,
  },
];

export default function App() {
  const { auth, setAuth } = useAuth();
  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    severity: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userData = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
  };

  const profileSettings = [
    {
      title: 'Account',
      icon: <SettingsRoundedIcon sx={{ color: customColors.blackLight }} />,
      path: USER_SETTINGS,
    },
    {
      title: 'Logout',
      icon: <LogoutRoundedIcon sx={{ color: customColors.blackLight }} />,
      onClick: () => handleLogout(backendApiCall, setAuth, setShowLogoutModal),
      path: HOME,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      await authenticateUser(backendApiCall, setAuth, setLoading);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.loggedIn]);

  const [favoriteQuizzes] = useState([
    {
      id: 'react-intermediate',
      title: 'React Intermediate',
      category: 'react',
      level: 'intermediate',
      labels: ['frontend'],
      image: reactJsLogo,
    },
    {
      id: 'js-arrays',
      title: 'JS Arrays',
      category: 'javascript',
      level: 'basic',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
  ]);

  const { activeFilters, setActiveFilter } = useFilterState();

  const changeFilter = useCallback(
    (filterType, filter) => {
      setActiveFilter(filterType, filter);
    },
    [setActiveFilter]
  );

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
        <Header
          profileSettings={profileSettings}
          userData={userData}
          auth={auth}
        />
        <NavBar />
        {!loading && (
          <Box sx={{ height: '100vh' }}>
            <Routes>
              {/* protected route */}
              <Route
                path={LOGIN}
                element={
                  auth.loggedIn ? <Navigate to="/"></Navigate> : <Login />
                }
              />
              <Route
                path={QUIZZES}
                element={
                  auth.loggedIn ? (
                    /* <Main quizzes={quizzes}/>*/
                    <Quizzes
                      changeFilter={changeFilter}
                      activeFilters={activeFilters}
                      quizProgress={quizProgress}
                    />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={`${QUIZ}/:quizId`}
                element={
                  auth.loggedIn ? (
                    <QuizContent />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={SIGNUP}
                element={
                  auth.loggedIn ? <Navigate to="/"></Navigate> : <SignUp />
                }
              />
              <Route
                path={RESET_PASSWORD}
                element={
                  auth.loggedIn ? (
                    <Navigate to="/"></Navigate>
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route
                path={FAVORITES}
                element={
                  auth.loggedIn ? (
                    <Favorites
                      favoriteQuizzes={favoriteQuizzes}
                      changeFilter={changeFilter}
                      activeFilters={activeFilters}
                      quizProgress={quizProgress}
                    />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              <Route
                path={NOTES}
                element={
                  auth.loggedIn ? <Notes /> : <Navigate to={LOGIN}></Navigate>
                }
              />
              <Route
                path={LIBRARY}
                element={
                  auth.loggedIn ? <Library /> : <Navigate to={LOGIN}></Navigate>
                }
              />
              <Route
                path={USER_SETTINGS}
                element={
                  auth.loggedIn ? (
                    <UserSettings />
                  ) : (
                    <Navigate to={LOGIN}></Navigate>
                  )
                }
              />
              {/* non-protected routes */}
              <Route path={'/'} element={<Navigate to={HOME} />} />
              <Route
                path={HOME}
                element={
                  <Home snackbar={setSnackbar} highlights={highlights} />
                }
              />
              <Route path={ABOUT} element={<About />} />
              <Route path={ERROR} element={<Error />} />
              <Route path="/*" element={<Navigate to={ERROR}></Navigate>} />
            </Routes>
            {showLogoutModal && (
              <LogoutModal
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
              />
            )}
            <Footer />
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
