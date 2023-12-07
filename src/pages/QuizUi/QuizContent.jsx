import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import QuestionContent from './QuestionContent';

export default function QuizContent() {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  /*const fetchQuizData = async () => {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${null}` },
    };

    const url = '';

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log(response);
        const errMessage = `${response.status}`;
        throw new Error(errMessage);
      }

      const quizData = await response.json();

      return quizData;
    } catch (error) {
      console.log(error.message);
    }
  };*/

  useEffect(() => {
    const title = 'Addition Quiz';

    const quizQs = [
      {
        id: 1,
        question: '2+2 equals:',
        options: [3, 4, 5, 6],
        correctAnswer: 4,
        userAnswer: null,
        isCurrentQ: null,
      },
      {
        id: 2,
        question: '2+3 equals:',
        options: [3, 4, 5, 6],
        correctAnswer: 5,
        userAnswer: null,
        isCurrentQ: null,
      },
      {
        id: 3,
        question: '2+4 equals:',
        options: [3, 4, 5, 6],
        correctAnswer: 6,
        userAnswer: null,
        isCurrentQ: null,
      },
      {
        id: 4,
        question: '2+1 equals:',
        options: [3, 4, 5, 6],
        correctAnswer: 3,
        userAnswer: null,
        isCurrentQ: null,
      },
    ];

    setQuestions(quizQs);
    setQuizTitle(title);
  }, []);

  const handleAnswerSelected = (answer, resetCallback) => {
    const selectedAnswer = parseInt(answer, 10);
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = selectedAnswer;
    setQuestions(updatedQuestions);

    //changes to the next question if more questions exist
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    resetCallback();
  };

  const handleSkipQuestion = (resetCallback) => {
    //changes to the next question if more questions exist
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    resetCallback();
  };

  const handleBackQuestion = (resetCallback) => {
    //changes to the next question if more questions exist
    if (currentQuestionIndex < questions.length && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }

    resetCallback();
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ pl: 4, pb: 2 }}>
          {quizTitle}
        </Typography>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            paddingInline: '30px',
            paddingBottom: '20px',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgb(223, 221, 221)', pl: 2, pr: 2 }}
          >
            {currentQuestionIndex < questions.length
              ? `${currentQuestionIndex + 1} of ${questions.length}`
              : `${currentQuestionIndex} of ${questions.length}`}
          </Typography>
          {questions.map((q, index) => {
            const correct = q.userAnswer === q.correctAnswer;
            const isCurrentQuestion = index === currentQuestionIndex;
            return (
              <div
                key={q.id}
                style={{
                  backgroundColor: !q.userAnswer
                    ? 'rgb(211, 209, 209)'
                    : correct
                      ? '#2e7d32'
                      : '#d32f2f',
                  border: isCurrentQuestion ? '2px solid #1976d2' : 'none',
                  borderRadius: '50%',
                  width: 9,
                  height: 9,
                  margin: 6,
                  display: 'inline-block',
                }}
              ></div>
            );
          })}
        </Container>
        {currentQuestionIndex < questions.length &&
          (!quizFinished ? (
            <QuestionContent
              questionId={questions[currentQuestionIndex].id}
              index={currentQuestionIndex}
              length={questions.length}
              question={questions[currentQuestionIndex].question}
              answer={questions[currentQuestionIndex].correctAnswer}
              options={questions[currentQuestionIndex].options}
              onAnswerSelected={handleAnswerSelected}
              onSkipQuestion={handleSkipQuestion}
              onBackQuestion={handleBackQuestion}
              userAnswers={questions.map((q) => q.userAnswer)}
              setFinishQuiz={setQuizFinished}
            />
          ) : (
            <Typography variant="subtitle1" align="left">
              Good Work! You finished the {quizTitle}!
            </Typography>
          ))}
      </Container>
    </>
  );
}
