import useAuth from '../../auth/useAuth';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  backendApiCall,
  fetchFavorites,
  fetchFavoritesAndAddUserQuizzes,
  getFavorites,
  removeFavorite,
} from '../../functions/exportFunctions';
import { LOGIN } from '../../App';
import { QuizzesContainer } from './QuizzesContainer';

export const Favorites = ({
  changeFilter,
  activeFilters,
  searchValue,
  setSnackbar,
}) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritesData, setFavoritesData] = useState({
    favoriteQuizzes: [],
    favoritesIds: [],
  });
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [userQuizzesUpdated, setUserQuizzesUpdated] = useState(false);
  const navigate = useNavigate();

  const removeFavoriteHandler = async (quizId) => {
    try {
      await removeFavorite(quizId);
      setFavoritesData((prevData) => ({
        ...prevData,
        favoritesIds: prevData.favoritesIds.filter(
          (favorite) => favorite !== quizId
        ),
        favoriteQuizzes: prevData.favoriteQuizzes.filter(
          (quiz) => quiz.id !== quizId
        ),
      }));
      setSnackbar({
        isOpened: true,
        severity: 'success',
        message: 'Quiz removed from favorites.',
      });
    } catch (error) {
      setSnackbar({
        isOpened: true,
        severity: 'error',
        message: 'An error occurred when removing a quiz from favorites.',
      });
      throw error;
    }
  };

  useEffect(() => {
    const fetchAllFavoriteQuizzes = async () => {
      try {
        setLoading(true);
        const quizzesIds = await getFavorites();
        setFavoritesData((prevData) => ({
          ...prevData,
          favoritesIds: quizzesIds,
        }));
        if (auth.loggedIn && !initialDataLoaded) {
          await fetchFavorites(
            backendApiCall,
            (quizzes) =>
              setFavoritesData((prevData) => ({
                ...prevData,
                favoriteQuizzes: quizzes,
              })),
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
    fetchAllFavoriteQuizzes();
  }, [auth.loggedIn, auth, initialDataLoaded, navigate]);

  useEffect(() => {
    const fetchUserFavoriteQuizzes = async () => {
      try {
        if (
          auth.loggedIn &&
          initialDataLoaded &&
          favoritesData.favoriteQuizzes.length > 0 &&
          !userQuizzesUpdated
        ) {
          await fetchFavoritesAndAddUserQuizzes(
            backendApiCall,
            favoritesData.favoriteQuizzes,
            (quizzes) =>
              setFavoritesData((prevData) => ({
                ...prevData,
                favoriteQuizzes: quizzes,
              })),
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
    fetchUserFavoriteQuizzes();
  }, [
    auth.loggedIn,
    initialDataLoaded,
    favoritesData.favoriteQuizzes.length,
    userQuizzesUpdated,
    navigate,
  ]);

  return useMemo(
    () => (
      <QuizzesContainer
        title="Your favorite quizzes"
        quizzesForFiltering={favoritesData.favoriteQuizzes}
        loading={loading}
        favoritesIds={favoritesData.favoritesIds}
        quizzesLength={favoritesData.favoriteQuizzes.length}
        activeFilters={activeFilters}
        error={error}
        removeFavoriteHandler={removeFavoriteHandler}
        changeFilter={changeFilter}
        searchValue={searchValue}
        message="Save your favorite quizzes so they are here."
      />
    ),
    [
      activeFilters,
      changeFilter,
      searchValue,
      loading,
      favoritesData.favoriteQuizzes,
      favoritesData.favoritesIds,
      removeFavoriteHandler,
    ]
  );
};
