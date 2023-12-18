import useAuth from '../../auth/useAuth';
import React, { useCallback, useMemo, useState } from 'react';
import {
  removeFavorite,
  useFetchFavoriteQuizzes,
} from '../../functions/exportFunctions';
import { LOGIN } from '../../App';
import { QuizzesContainer } from './Main';

export const Favorites = ({ changeFilter, activeFilters, searchValue }) => {
  const { auth } = useAuth();
  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const { loading, error } = useFetchFavoriteQuizzes(
    auth,
    favoriteQuizzes,
    setFavoriteQuizzes,
    setFavoritesIds,
    LOGIN
  );

  const removeFavoriteHandler = useCallback(
    async (quizId) => {
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
    },
    [setFavoritesIds, setFavoriteQuizzes]
  );

  return useMemo(
    () => (
      <QuizzesContainer
        title="Your favorite quizzes"
        quizzesForFiltering={favoriteQuizzes}
        loading={loading}
        favoritesIds={favoritesIds}
        quizzesLength={favoriteQuizzes.length}
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
      favoriteQuizzes,
      favoritesIds,
      removeFavoriteHandler,
      error,
    ]
  );
};
