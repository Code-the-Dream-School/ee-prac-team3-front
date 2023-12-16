import useAuth from '../../auth/useAuth';
import useQuiz from '../../quiz/useQuiz';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addFavorite,
  backendApiCall,
  fetchAndAddUserQuizzes,
  fetchQuizData,
  getFavorites,
  removeFavorite,
} from '../../functions/exportFunctions';
import { LOGIN } from '../../App';
import { QuizzesContainer } from './Main';

export const Quizzes = ({ changeFilter, activeFilters, searchValue }) => {
  const { auth } = useAuth();
  const { quizzes, setQuizzes } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [userQuizzesUpdated, setUserQuizzesUpdated] = useState(false);

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
        if (auth.loggedIn && quizzes.length === 1 && !initialDataLoaded) {
          await fetchQuizData(
            backendApiCall,
            setQuizzes,
            setError,
            auth,
            setLoading
          );
          setInitialDataLoaded(true);
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
  }, [auth.loggedIn, quizzes.length, initialDataLoaded]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesIds = await getFavorites();
        setFavoritesIds(quizzesIds);
        if (
          auth.loggedIn &&
          initialDataLoaded &&
          quizzes.length > 0 &&
          !userQuizzesUpdated
        ) {
          await fetchAndAddUserQuizzes(
            backendApiCall,
            quizzes,
            setQuizzes,
            setError,
            auth,
            setUserQuizzesUpdated
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
  }, [auth.loggedIn, initialDataLoaded, quizzes.length, userQuizzesUpdated]);

  return (
    <QuizzesContainer
      title="Choose a quiz"
      activeFilters={activeFilters}
      changeFilter={changeFilter}
      message="No quizzes were found."
      quizzesForFiltering={quizzes}
      favoritesIds={favoritesIds}
      addToFavoritesHandler={addToFavoritesHandler}
      removeFavoriteHandler={removeFavoriteHandler}
      searchValue={searchValue}
      loading={loading}
      error={error}
      quizzesLength={quizzes.length}
    />
  );
};
