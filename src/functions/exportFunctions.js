import reactJsLogo from '../assets/images/react-logo-svgrepo-com.svg';
import jsLogo from '../assets/images/js.svg';
import nodeJsLogo from '../assets/images/nodejs.svg';
import dataStructureLogo from '../assets/images/hierarchical-structure-svgrepo-com.svg';
import { BASE_URL } from '../config';
import { severities } from '../App';

const imageMapping = {
  react: reactJsLogo,
  javascript: jsLogo,
  nodejs: nodeJsLogo,
  datastructures: dataStructureLogo,
};

const createQuizObject = (quiz) => {
  const image = imageMapping[quiz.category] || jsLogo;
  return {
    id: quiz._id,
    title: quiz.title,
    category: quiz.category,
    level: quiz.level,
    labels: quiz.label,
    image: image,
    questions: quiz.questions.map((q) => ({
      questionText: q.questionText,
      type: q.type,
      code: q.code,
      resources: '',
      options: q.options,
      correctOption: q.correctOption,
      id: q._id,
    })),
    quizProgress: {
      attemptsCount: 0,
      bestScore: 0,
      lastScore: 0,
    },
    createdDate: quiz.createdAt,
  };
};

const handleApiError = (error, setError) => {
  console.error('API Error:', error);
  setError(error);
};

export const backendApiCall = async (method, url, body) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (backendApiCall, setAuth, setLoading) => {
  try {
    const backendUserData = await backendApiCall('GET', '/login');
    setAuth({
      userId: backendUserData.user.userId,
      firstName: backendUserData.user.firstname,
      lastName: backendUserData.user.lastname,
      email: backendUserData.user.email,
      role: backendUserData.user.role,
      loggedIn: true,
      accessToken: backendUserData.user.accessToken,
      avatarURL: backendUserData.user.avatarURL,
      favorites: backendUserData.user.favorites,
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async (
  backendApiCall,
  setAuth,
  setShowLogoutModal
) => {
  try {
    await backendApiCall('GET', '/logout');

    setAuth({
      loggedIn: false,
    });
    setShowLogoutModal(true);
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchAndTransformQuizzes = async (
  backendApiCall,
  setQuizzes,
  setError,
  auth,
  setLoading
) => {
  try {
    setLoading(true);

    if (!auth.loggedIn) return;

    const apiQuizData = await backendApiCall('GET', '/quiz');
    const transformedQuizzes = apiQuizData.map(createQuizObject);
    setQuizzes(transformedQuizzes);
  } catch (err) {
    handleApiError(err, setError);
  } finally {
    setLoading(false);
  }
};

export const fetchAndAddUserQuizzes = async (
  backendApiCall,
  quizzes,
  setQuizzes,
  setError,
  auth,
  setUserQuizzesUpdated
) => {
  if (!auth.loggedIn) return;
  try {
    const userQuizDataArray = await backendApiCall(
      'GET',
      `/progress/user?userId=${auth.userId}`
    );
    const updatedQuizzes = quizzes.map((quiz) => {
      const userQuizData = userQuizDataArray.data.find(
        (uqd) => uqd.quiz === quiz.id
      );
      if (userQuizData) {
        return {
          ...quiz,
          quizProgress: {
            attemptsCount: userQuizData.attemptNumber.toString(),
            bestScore: userQuizData.maxScore,
            lastScore: userQuizData.score,
          },
        };
      }
      return quiz;
    });

    setQuizzes(updatedQuizzes);
    setUserQuizzesUpdated(true);
  } catch (err) {
    setError(err);
  }
};

export async function fetchQuizData(
  backendApiCall,
  setQuizzes,
  setError,
  auth,
  setLoading
) {
  try {
    await fetchAndTransformQuizzes(
      backendApiCall,
      setQuizzes,
      setError,
      auth,
      setLoading
    );
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}

export async function updateUserProgress(quizId, score, userId, setError) {
  const body = { quiz: quizId, score: score.toString(), user: userId };
  const url = '/progress/user';
  try {
    return await backendApiCall('POST', `${url}`, body);
  } catch (err) {
    setError(err);
  }
}

export const getFavorites = async () => {
  try {
    const response = await backendApiCall('GET', '/favorites');
    return response.favorites;
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

export const fetchAndTransformFavoriteQuizzes = async (
  backendApiCall,
  setFavoriteQuizzes,
  setError,
  auth
) => {
  if (!auth.loggedIn) return;

  try {
    const apiQuizData = await backendApiCall('GET', '/quiz');
    const favoriteQuizIds = await getFavorites();

    const favoriteQuizzes = apiQuizData
      .filter((quiz) => favoriteQuizIds.includes(quiz._id))
      .map(createQuizObject);

    setFavoriteQuizzes(favoriteQuizzes);
  } catch (err) {
    handleApiError(err, setError);
  }
};

export async function fetchFavorites(
  backendApiCall,
  setFavoriteQuizzes,
  setError,
  auth,
  setLoading
) {
  try {
    await fetchAndTransformFavoriteQuizzes(
      backendApiCall,
      setFavoriteQuizzes,
      setError,
      auth
    );
  } catch (err) {
    handleApiError(err, setError);
  } finally {
    setLoading(false);
  }
}

export const fetchFavoritesAndAddUserQuizzes = async (
  backendApiCall,
  favoriteQuizzes,
  setFavoriteQuizzes,
  setError,
  auth,
  setUserQuizzesUpdated
) => {
  if (!auth.loggedIn) return;
  try {
    const userQuizDataArray = await backendApiCall(
      'GET',
      `/progress/user?userId=${auth.userId}`
    );
    const updatedQuizzes = favoriteQuizzes.map((quiz) => {
      const userQuizData = userQuizDataArray.data.find(
        (uqd) => uqd.quiz === quiz.id
      );
      if (userQuizData) {
        return {
          ...quiz,
          quizProgress: {
            attemptsCount: userQuizData.attemptNumber.toString(),
            bestScore: userQuizData.maxScore,
            lastScore: userQuizData.score,
          },
        };
      }
      return quiz;
    });

    setFavoriteQuizzes(updatedQuizzes);
    setUserQuizzesUpdated(true);
  } catch (err) {
    setError(err);
  }
};

export const addFavorite = async (quizId) => {
  try {
    await backendApiCall('POST', '/favorites/add', {
      quizId,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (quizId) => {
  try {
    await backendApiCall('POST', '/favorites/remove', {
      quizId,
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const deleteUser = async (setSnackbar, setAuth) => {
  const url = `${BASE_URL}/deleteuser`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: 'An error occurred while deleting your account.',
      });
      throw new Error(data.message || 'Failed to delete account');
    }

    setAuth({
      loggedIn: false,
    });
    localStorage.clear();

    setSnackbar({
      isOpened: true,
      severity: severities.SUCCESS,
      message:
        'The account was successfully deleted. We hope to see you again!',
    });
  } catch (error) {
    throw new Error(`Error deleting account: ${error.message}`);
  }
};
