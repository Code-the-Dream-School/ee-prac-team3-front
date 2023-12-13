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
  minHeight: '85vh',
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
  quizProgress,
  searchValue,
  loading,
  error,
  quizzesLength,
}) => {
  const getProgressForQuiz = (quizId) => {
    const progressObj = quizProgress.find((p) => p.quizId === quizId);
    return progressObj ? progressObj : 0;
  };
  const filteredQuizzes = useMemo(() => {
    return quizzesForFiltering.filter(({ level, category, labels, title }) => {
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
    });
  }, [quizzesForFiltering, activeFilters, searchValue]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                          />
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export const Quizzes = ({
  changeFilter,
  activeFilters,
  quizProgress,
  searchValue,
}) => {
  const { quizzes, setQuizzes } = useQuiz();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(backendApiCall, setQuizzes, setError, auth, setLoading);

    if (auth.loggedIn && quizzes.length === 1) {
      fetchData();
    } else if (!auth.loggedIn) {
      navigate(LOGIN);
    } else {
      setLoading(false);
    }
  }, [auth, quizzes.length, navigate, setQuizzes]);
  return (
    <QuizzesContainer
      title="Choose a quiz"
      quizzesForFiltering={quizzes}
      quizzesLength={quizzes.length}
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
  favoriteQuizzes,
  changeFilter,
  activeFilters,
  quizProgress,
  searchValue,
}) => (
  <QuizzesContainer
    title="Your favorite quizzes"
    quizzesForFiltering={favoriteQuizzes}
    quizzesLength={favoriteQuizzes.length}
    activeFilters={activeFilters}
    changeFilter={changeFilter}
    quizProgress={quizProgress}
    searchValue={searchValue}
    message="Save your favorite quizzes so they are here."
  />
);
