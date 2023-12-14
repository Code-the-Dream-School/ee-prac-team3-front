import { createContext, useEffect, useState } from 'react';
import useAuth from '../auth/useAuth';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([
    {
      id: '',
      title: '',
      category: '',
      level: 'basic',
      labels: [''],
      image: null,
      questions: [
        {
          questionText: '',
          options: ['', '', '', ''],
          correctOption: '',
          type: 'radio',
          _id: '',
          code: '',
          resources: '',
        },
      ],
      createdDate: '',
    },
  ]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
