import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import useAuth from 'auth/useAuth';
import useQuiz from 'quiz/useQuiz';
import Quiz from './Quiz';
import QuizLoadError from './QuizLoadError';
import { LOGIN, HOME } from 'App';
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
  quizProgress,
}) => {
  const { auth } = useAuth();
  const { quizzes, setQuizzes } = useQuiz();
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
  }, [auth.loggedIn, quizzes.length]);

  const getProgressForQuiz = (quizId) => {
    const progressObj = quizProgress.find((p) => p.quizId === quizId);
    return progressObj ? progressObj : 0;
  };
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(({ level, category, labels }) => {
      const levelFilter =
        activeFilters.levels.length === 0 ||
        activeFilters.levels.includes(level);
      const categoryFilter =
        activeFilters.categories.length === 0 ||
        activeFilters.categories.includes(category);
      const labelsFilter =
        activeFilters.labels.length === 0 ||
        activeFilters.labels.some((label) => labels.includes(label));

      return levelFilter && categoryFilter && labelsFilter;
    });
  }, [quizzes, activeFilters]);

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
                  {quizzes && <FilterButtonGroup changeFilter={changeFilter} />}
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
  quizzes,
  changeFilter,
  activeFilters,
  quizProgress,
}) => (
  <QuizzesContainer
    title="Choose a quiz"
    quizzes={quizzes}
    activeFilters={activeFilters}
    changeFilter={changeFilter}
    quizProgress={quizProgress}
    message="No quizzes were found."
  />
);

export const Favorites = ({
  favoriteQuizzes,
  changeFilter,
  activeFilters,
  quizProgress,
}) => (
  <QuizzesContainer
    title="Your favorite quizzes"
    quizzes={favoriteQuizzes}
    activeFilters={activeFilters}
    changeFilter={changeFilter}
    quizProgress={quizProgress}
    message="Save your favorite quizzes so they are here."
  />
);
