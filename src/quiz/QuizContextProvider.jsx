import { createContext, useState } from 'react';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([
    {
      id: '', //
      title: '', // React Basic, JS Advanced etc.
      category: '', // react, javascript, html, css, data structures etc.
      level: 'basic', // basic, intermediate, advanced
      labels: [''], // frontend, backend
      image: null,
      questions: [
        {
          questionText: '',
          options: ['', '', '', ''], // all answers
          correctOption: '', // correct answer
          type: 'radio', //radio or checkbox
          _id: '',
          code: '', //
          resources: '', //here we can add some info about the question after the user chose wrong/correct question
        },
      ],
      quizProgress: {
        attemptsCount: 0,
        bestScore: 0,
        lastScore: 0,
      },
      createdDate: '', // createdAt
    },
  ]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
