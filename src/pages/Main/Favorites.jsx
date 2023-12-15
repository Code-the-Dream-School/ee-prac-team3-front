import React, {useState} from "react";
import reactJsLogo from '../../assets/images/react-logo-svgrepo-com.svg';
import jsLogo from '../../assets/images/js.svg';
import {QuizzesContainer} from "./Main";

export const Favorites = ({
                              changeFilter,
                              activeFilters,
                              searchValue,
                          }) => {
   /* const { auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
    const [favoritesIds, setFavoritesIds] = useState([]);
    const navigate = useNavigate();*/

    const [favoriteQuizzes] = useState([
        {
            id: 'react-intermediate',
            title: 'React Intermediate',
            category: 'react',
            level: 'intermediate',
            labels: ['frontend'],
            image: reactJsLogo,
            quizProgress: {
                attemptsCount: 0,
                bestScore: 0,
                lastScore: 0,
            },
        },
        {
            id: 'js-arrays',
            title: 'JS Arrays',
            category: 'javascript',
            level: 'basic',
            labels: ['frontend', 'backend'],
            image: jsLogo,
            quizProgress: {
                attemptsCount: 2,
                bestScore: 80,
                lastScore: 80,
            },
        },
    ]);
   /* const removeFavoriteHandler = async (quizId) => {
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
    }, [auth.loggedIn, setFavoritesIds, auth, favoriteQuizzes.length, navigate]);*/

    return (
        <QuizzesContainer
            title="Your favorite quizzes"
            quizzesForFiltering={favoriteQuizzes}
           /* loading={loading}
            error={error}
            favoritesIds={favoritesIds}*/
            quizzesLength={favoriteQuizzes.length}
            activeFilters={activeFilters}
            /*removeFavoriteHandler={removeFavoriteHandler}*/
            changeFilter={changeFilter}
            searchValue={searchValue}
            message="Save your favorite quizzes so they are here."
        />
    );
};