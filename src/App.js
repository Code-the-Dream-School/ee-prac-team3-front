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
import dataStructureLogo from './assets/images/hierarchical-structure-svgrepo-com.svg';

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

const checkLoginStatus = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization':
    },
    credentials: 'include',
  };

  const url = `${port}/api/v1/login`; // API endpoint

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return data.user;
  } catch (error) {
    throw error;
  }
};

const teamRoles = {
  BACKEND_TEAM: 'backend team',
  FRONTEND_TEAM: 'frontend team',
  MENTOR: 'mentor'
};
const { BACKEND_TEAM, FRONTEND_TEAM, MENTOR } = teamRoles;
export const projectTeam = [
  {
    id: '1',
    name: 'Elijah Bernstein-Cooper',
    imageURL:
        'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
    role: MENTOR,
    gitHub: 'https://github.com/ezbc',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer. Et malesuada fames ac turpis egestas sed.',
  },
  {
    id: '2',
    name: 'Sergey Sherstobitov',
    imageURL: 'https://avatars.githubusercontent.com/u/3116876?v=4',
    role: MENTOR,
    gitHub: 'https://github.com/in43sh',
    description:
        'Full-stack web-developer with hands-on experience in building responsive and fast websites. He is also a continuous learner, always looking for effective ways to overcome a challenge. In addition, he is passionate about improving user’s interaction with a website.',
  },
  {
    id: '3',
    name: 'Katsiaryna Lashcheuskaya',
    imageURL: 'https://avatars.githubusercontent.com/u/111474106?v=4',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/katsiarynalashcheuskaya',
    description:
        'As a junior developer, her goal is to continue growing, collaborating, and making impactful contributions to the world of web development. ' +
        'Her strengths include strong analytical skills and a sense of responsibility.',
  },
  {
    id: '4',
    name: 'David Greenslade',
    imageURL:
        'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/DavidGslade86',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer. Et malesuada fames ac turpis egestas sed.',
  },
  {
    id: '5',
    name: 'Eva Weisneck',
    imageURL:
        'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/evaw277',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas integer. Et malesuada fames ac turpis egestas sed.',
  },
  {
    id: '6',
    name: 'Alina Matskevich',
    imageURL:
        'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
    role: BACKEND_TEAM,
    gitHub: 'https://github.com/npnote8',
    description:
        'She believes strongly in the power of programming\n' +
        'and was looking to build the app that is beneficial for others.\n' +
        'Besides   coding,   Alina   enjoys   listening   to   music,   gardening,\n' +
        'and reading books',
  },
  {
    id: '7',
    name: 'Bangah M’Bayi Yann',
    imageURL: 'https://avatars.githubusercontent.com/u/81714858?v=4',
    role: BACKEND_TEAM,
    gitHub: 'https://github.com/Bino26',
    description:
        'He   is passionate about coding and enjoys being challenged.    Bino\n' +
        'is a fast learner and a creative problem-solver - all things that\n' +
        'make   him   an   excellent   software   developer. ',
  }
];
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
    quizId: 'react-middle',
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

  const userData = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
  };

  const logoutUser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const url = `${port}/api/v1/logout`; // API endpoint

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        setAuth({
          userId: '',
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          avatarURL: '',
          role: [''],
          loggedIn: false,
          accessToken: '',
          isActive: undefined,
        });
      }
      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      throw error;
    }
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
      onClick: logoutUser,
      path: HOME,
    },
  ];

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const backendUserData = await checkLoginStatus();
        setAuth({
          userId: backendUserData.userId,
          firstName: backendUserData.firstname,
          lastName: backendUserData.lastname,
          username: backendUserData.username,
          email: backendUserData.url,
          role: backendUserData.role,
          loggedIn: true,
          accessToken: backendUserData.accessToken,
          isActive: backendUserData.isActive,
        });
      } catch (error) {
        throw new Error(error);
      }
    };
    authenticateUser();
  }, [auth.loggedIn]);

  const [quizzes] = useState([
    {
      id: 'react-basic',
      title: 'React Basic',
      category: 'react',
      level: 'basic',
      labels: ['frontend'],
      image: reactJsLogo,
    },
    {
      id: 'react-middle',
      title: 'React Middle',
      category: 'react',
      level: 'middle',
      labels: ['frontend'],
      image: reactJsLogo,
    },
    {
      id: 'js-basic',
      title: 'JS Basic',
      category: 'javascript',
      level: 'basic',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
    {
      id: 'js-functions',
      title: 'JS Functions',
      category: 'javascript',
      level: 'basic',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
    {
      id: 'js-middle',
      title: 'JS Middle',
      category: 'javascript',
      level: 'middle',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
    {
      id: 'data-structures',
      title: 'Data structures',
      category: 'data structure',
      level: 'middle',
      labels: ['frontend', 'backend'],
      image: dataStructureLogo,
    },
    {
      id: 'js-arrays',
      title: 'JS Arrays',
      category: 'javascript',
      level: 'basic',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
    {
      id: 'js-promises',
      title: 'JS Promises',
      category: 'javascript',
      level: 'middle',
      labels: ['frontend', 'backend'],
      image: jsLogo,
    },
  ]);
  const [favoriteQuizzes] = useState([
    {
      id: 'react-middle',
      title: 'React Middle',
      category: 'react',
      level: 'middle',
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
        <Routes>
          {/* protected route */}
          <Route
            path={LOGIN}
            element={auth.loggedIn ? <Navigate to="/"></Navigate> : <Login />}
          />
          <Route
            path={QUIZZES}
            element={
              auth.loggedIn ? (
                /* <Main quizzes={quizzes}/>*/
                <Quizzes
                  quizzes={quizzes}
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
            path={SIGNUP}
            element={auth.loggedIn ? <Navigate to="/"></Navigate> : <SignUp />}
          />
          <Route
            path={RESET_PASSWORD}
            element={
              auth.loggedIn ? <Navigate to="/"></Navigate> : <ResetPassword />
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
              <Home
                snackbar={setSnackbar}
                highlights={highlights}
              />
            }
          />
          <Route path={ABOUT} element={<About  team={projectTeam}/>} />
          <Route path={ERROR} element={<Error />} />
          <Route path="/*" element={<Navigate to={ERROR}></Navigate>} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}
