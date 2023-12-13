import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
import useAuth from 'auth/useAuth';
import useQuiz from 'quiz/useQuiz';
import Quiz from './Quiz';
import QuizLoadError from './QuizLoadError';
import { LOGIN } from 'App';
import Loading from '../components/Loading';
import FilterButtonGroup from '../components/FilterButtonGroup';
import customColors, { defaultTheme } from '../assets/styles';
import { backendApiCall, fetchData } from '../functions/exportFunctions';

export const containerStyles = {
  minHeight: '95vh',
  backgroundColor: customColors.backgroundLight,
  maxWidth: 'none !important',
  pt: 6,
  pb: 6,
};
export const titleStyles = {
  textTransform: 'uppercase',
  mb: 2,
  textAlign: 'center',
  fontWeight: 'bold',
  [defaultTheme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
};
const messageStyles = {
  mt: 5,
  textAlign: 'center',
  color: customColors.greyDark,
};
const boxStyles = {
  width: '100%',
  maxWidth: '1200px',
};

const QuizzesContainer = ({
  title,
  activeFilters,
  changeFilter,
  message,
  quizzesForFiltering,
  auth,
  quizProgress,
  searchValue,
  loading,
  error,
  quizzesLength,
}) => {
  const getProgressForQuiz = useMemo(
    () => (quizId) => {
      const progressObj = quizProgress.find((p) => p.quizId === quizId);
      return progressObj || 0;
    },
    [quizProgress]
  );

  const filteredQuizzes = useMemo(
    () =>
      quizzesForFiltering.filter(({ level, category, labels, title }) => {
        const levelFilter =
          activeFilters.levels.length === 0 ||
          activeFilters.levels.includes(level);
        const categoryFilter =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(category);
        const labelsFilter =
          activeFilters.labels.length === 0 ||
          activeFilters.labels.some((label) => labels.includes(label));

        const searchFilter =
          searchValue === '' ||
          title.toLowerCase().includes(searchValue.toLowerCase());

        return levelFilter && categoryFilter && labelsFilter && searchFilter;
      }),
    [quizzesForFiltering, activeFilters, searchValue]
  );

  return (
    <>
      <Container sx={containerStyles}>
        {error ? (
          <QuizLoadError />
        ) : (
          <>
            <Typography variant="h5" sx={titleStyles}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={boxStyles}>
                {quizzesLength > 0 && (
                  <FilterButtonGroup changeFilter={changeFilter} />
                )}
                {loading ? (
                  <Loading type="circular" />
                ) : (
                  <>
                    {filteredQuizzes.length === 0 && (
                      <Typography sx={messageStyles}>{message}</Typography>
                    )}
                    {filteredQuizzes.length > 0 && (
                      <Box sx={{ py: 3 }} maxWidth="lg" width="100%">
                        <Grid
                          container
                          spacing={4}
                          sx={{ display: 'flex', justifyContent: 'start' }}
                        >
                          {filteredQuizzes.map((q) => (
                            <Quiz
                              key={q.id}
                              quiz={q}
                              activeFilters={activeFilters}
                              getProgressForQuiz={getProgressForQuiz}
                              auth={auth}
                            />
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

const useQuizzes = () => {
  const { quizzes, setQuizzes } = useQuiz();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (auth.loggedIn && quizzes.length === 1) {
          await fetchData(
            backendApiCall,
            setQuizzes,
            setError,
            auth,
            setLoading
          );
        } else if (!auth.loggedIn) {
          navigate(LOGIN);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchQuizzes();
  }, [auth, quizzes.length, navigate, setQuizzes]);

  return { loading, error };
};

export const Quizzes = ({
  changeFilter,
  activeFilters,
  quizProgress,
  searchValue,
}) => {
  const { loading, error } = useQuizzes();
  const { quizzes } = useQuiz();
  const { auth } = useAuth();

  return (
    <QuizzesContainer
      title="Choose a quiz"
      quizzesForFiltering={quizzes}
      quizzesLength={quizzes.length}
      auth={auth}
      loading={loading}
      error={error}
      activeFilters={activeFilters}
      changeFilter={changeFilter}
      quizProgress={quizProgress}
      searchValue={searchValue}
      message="No quizzes were found."
    />
  );
};

export const Favorites = ({
  changeFilter,
  activeFilters,
  quizProgress,
  searchValue,
}) => {
  const { loading, error } = useQuizzes();
  const { quizzes } = useQuiz();
  const { auth } = useAuth();
  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);

  useEffect(() => {
    const updatedFavoriteQuizzes = quizzes.filter((quiz) =>
      auth.favorites.includes(quiz.id)
    );
    setFavoriteQuizzes(updatedFavoriteQuizzes);
  }, [quizzes, auth.favorites]);

  return (
    <QuizzesContainer
      title="Your favorite quizzes"
      quizzesForFiltering={favoriteQuizzes}
      auth={auth}
      loading={loading}
      error={error}
      quizzesLength={favoriteQuizzes.length}
      activeFilters={activeFilters}
      changeFilter={changeFilter}
      quizProgress={quizProgress}
      searchValue={searchValue}
      message="Save your favorite quizzes so they are here."
    />
  );
};
