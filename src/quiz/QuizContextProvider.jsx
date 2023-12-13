import { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const { auth } = useAuth();
  const [quizzes, setQuizzes] = useState([
    {
      id: '',
      title: '',
      category: '',
      level: 'basic',
      labels: [''],
      image: null,
      isFavorite: false,
      questions: [
        {
          questionText: '',
          options: ['', '', '', ''],
          correctOption: '',
          type: 'radio',
          _id: '',
          code: '', //
          resources: '',
        },
      ],
      createdDate: '',
    },
  ]);
  useEffect(() => {
    const updateFavorites = () => {
      const updatedQuizzes = quizzes.map((quiz) => ({
        ...quiz,
        isFavorite: auth.favorites.includes(quiz.id),
      }));
      console.log('updatedQuizzes ==== ', updatedQuizzes);
      setQuizzes(updatedQuizzes);
    };

    updateFavorites();
  }, [auth.favorites]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
