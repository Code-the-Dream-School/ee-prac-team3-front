import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import useAuth from 'auth/useAuth';
import useQuiz from 'quiz/useQuiz';
import Quiz from './Quiz';
import QuizLoadError from './QuizLoadError';
import { LOGIN } from 'App';
import Loading from '../components/Loading';
import FilterButtonGroup from '../components/FilterButtonGroup';
import customColors, { defaultTheme } from '../assets/styles';
import {
  addFavorite,
  backendApiCall,
  fetchData,
  fetchFavorites,
  getFavorites,
  removeFavorite,
} from '../functions/exportFunctions';

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
  favoritesIds,
  addToFavoritesHandler,
  removeFavoriteHandler,
  quizProgress,
  searchValue,
  loading,
  error,
  quizzesLength,
  itemsPerPage = 9,
  loadMoreThreshold = 100,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);

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

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - loadMoreThreshold) {
      loadMoreQuizzes();
    }
  };

  const loadMoreQuizzes = useCallback(() => {
    if (loadingMore) return;

    setLoadingMore(true);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newQuizzes = filteredQuizzes.slice(startIndex, endIndex);

    const uniqueNewQuizzes = newQuizzes.filter(
      (newQuiz) => !displayedQuizzes.some((quiz) => quiz.id === newQuiz.id)
    );

    setDisplayedQuizzes((prevQuizzes) => [...prevQuizzes, ...uniqueNewQuizzes]);

    setCurrentPage((prevPage) => prevPage + 1);

    setLoadingMore(false);
  }, [
    loadingMore,
    currentPage,
    itemsPerPage,
    filteredQuizzes,
    displayedQuizzes,
  ]);

  useEffect(() => {
    setDisplayedQuizzes(filteredQuizzes.slice(0, itemsPerPage));
  }, [filteredQuizzes, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - loadMoreThreshold) {
        loadMoreQuizzes();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreQuizzes, loadMoreThreshold]);

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
                      <Alert sx={{ mt: 3 }} severity="info">
                        {message}
                      </Alert>
                    )}
                    {filteredQuizzes.length > 0 && (
                      <Box sx={{ py: 3 }} maxWidth="lg" width="100%">
                        <Grid
                          container
                          spacing={4}
                          sx={{ display: 'flex', justifyContent: 'start' }}
                        >
                          {displayedQuizzes.map((q) => (
                            <Quiz
                              key={q.id}
                              quiz={q}
                              activeFilters={activeFilters}
                              searchValue={searchValue}
                              getProgressForQuiz={getProgressForQuiz}
                              favoritesIds={favoritesIds}
                              addToFavoritesHandler={addToFavoritesHandler}
                              removeFavoriteHandler={removeFavoriteHandler}
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
  const [favoritesIds, setFavoritesIds] = useState([]);
  const navigate = useNavigate();

  const addToFavoritesHandler = async (quizId) => {
    try {
      await addFavorite(quizId);
      setFavoritesIds((prevFavoritesIds) => [...prevFavoritesIds, quizId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFavoriteHandler = async (quizId) => {
    try {
      await removeFavorite(quizId);
      setFavoritesIds((prevFavoriteQuizzesIds) =>
        prevFavoriteQuizzesIds.filter((favorite) => favorite !== quizId)
      );
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesIds = await getFavorites();
        setFavoritesIds(quizzesIds);
        if (auth.loggedIn && quizzes.length <= 1) {
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
  }, [auth.favorites, quizzes.length, navigate, setQuizzes, auth]);

  return (
    <QuizzesContainer
      title="Choose a quiz"
      quizzesForFiltering={quizzes}
      quizzesLength={quizzes.length}
      loading={loading}
      error={error}
      favoritesIds={favoritesIds}
      activeFilters={activeFilters}
      changeFilter={changeFilter}
      quizProgress={quizProgress}
      addToFavoritesHandler={addToFavoritesHandler}
      removeFavoriteHandler={removeFavoriteHandler}
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
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const navigate = useNavigate();

  const removeFavoriteHandler = async (quizId) => {
    try {
      await removeFavorite(quizId);
      setFavoritesIds((prevFavoriteQuizzesIds) =>
        prevFavoriteQuizzesIds.filter((favorite) => favorite !== quizId)
      );
      setFavoriteQuizzes((prevFavoriteQuizzes) =>
        prevFavoriteQuizzes.filter((quiz) => quiz.id !== quizId)
      );
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  useEffect(() => {
    const fetchAndSetFavoriteQuizzes = async () => {
      try {
        setLoading(true);
        const quizzesIds = await getFavorites();
        setFavoritesIds(quizzesIds);

        if (auth.loggedIn && favoriteQuizzes.length <= 1) {
          await fetchFavorites(
            backendApiCall,
            setFavoriteQuizzes,
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
    fetchAndSetFavoriteQuizzes();
  }, [auth.loggedIn, setFavoritesIds, auth, favoriteQuizzes.length, navigate]);

  return (
    <QuizzesContainer
      title="Your favorite quizzes"
      quizzesForFiltering={favoriteQuizzes}
      loading={loading}
      error={error}
      favoritesIds={favoritesIds}
      quizzesLength={favoriteQuizzes.length}
      activeFilters={activeFilters}
      removeFavoriteHandler={removeFavoriteHandler}
      changeFilter={changeFilter}
      quizProgress={quizProgress}
      searchValue={searchValue}
      message="Save your favorite quizzes so they are here."
    />
  );
};
