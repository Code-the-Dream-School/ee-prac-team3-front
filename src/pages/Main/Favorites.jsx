import useAuth from "../../auth/useAuth";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    backendApiCall,
    fetchFavorites, fetchFavoritesAndAddUserQuizzes,
    getFavorites,
    removeFavorite
} from "../../functions/exportFunctions";
import {LOGIN} from "../../App";
import {QuizzesContainer} from "./Main";

export const Favorites = ({
                              changeFilter,
                              activeFilters,
                              searchValue,
                          }) => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
    const [favoritesIds, setFavoritesIds] = useState([]);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [userQuizzesUpdated, setUserQuizzesUpdated] = useState(false);
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
                if (auth.loggedIn && favoriteQuizzes.length === 0 && !initialDataLoaded) {
                    console.log('fetchFavorites')
                    await fetchFavorites(
                        backendApiCall,
                        setFavoriteQuizzes,
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
        fetchAndSetFavoriteQuizzes();
    }, [auth.loggedIn, setFavoritesIds, auth, favoriteQuizzes.length, navigate]);


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                if (auth.loggedIn &&
                    initialDataLoaded &&
                    favoriteQuizzes.length > 0 &&
                    !userQuizzesUpdated) {
                    await fetchFavoritesAndAddUserQuizzes(
                        backendApiCall,
                        favoriteQuizzes,
                        setFavoriteQuizzes,
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
    }, [auth.loggedIn, initialDataLoaded, favoriteQuizzes.length, userQuizzesUpdated]);


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
            searchValue={searchValue}
            message="Save your favorite quizzes so they are here."
        />
    );
};