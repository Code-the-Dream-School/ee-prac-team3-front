import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import useQuiz from '../../quiz/useQuiz';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';
import QuestionContent from './QuestionContent';
import Loading from 'components/Loading';
import QuizLoadError from '../QuizLoadError';
import { QUIZZES, ERROR } from '../../App';
import { containerStyles, titleStyles } from '../Main';
import {
  backendApiCall,
  fetchQuizData,
  updateUserProgress,
  fetchAndAddUserQuizzes,
} from '../../functions/exportFunctions';

export default function QuizContent() {
  //context variables
  const { quizId } = useParams();
  const { quizzes, setQuizzes } = useQuiz();
  const { auth } = useAuth();

  //state variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [userPerformance, setUserPerformance] = useState({
    correctCount: 0,
    totalCount: 0,
  });
  const [userQuizzesUpdated, setUserQuizzesUpdated] = useState(false);

  const navigate = useNavigate();

  //quiz content variables
  const quiz = quizzes.find((q) => q.id === quizId);
  const questions = quiz?.questions || [];
  const quizTitle = quiz?.title || '';

  //state array tracking user selections for all questions
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill('')
  );

  //fetches quiz data if context quiz data is reset
  useEffect(() => {
    if (quizzes.length === 1 && auth.loggedIn) {
      fetchQuizData(backendApiCall, setQuizzes, setError, auth, setLoading);
    } else {
      setLoading(false);
    }
  }, [auth, quizzes.length, setQuizzes]);

  //navigates to error page if quiz can't be found
  useEffect(() => {
    if (!loading && !quiz) {
      navigate(ERROR);
    }
  }, [loading, quiz, navigate]);

  //updates user performance if user finishes quiz
  useEffect(() => {
    if (quizFinished && !userQuizzesUpdated) {
      const correctCount = answersCorrectness.filter(
        (answer) => answer && answer.isCorrect
      ).length;
      const totalCount = questions.length;
      setUserPerformance({ correctCount, totalCount });
      const finalScore = Math.round((correctCount / totalCount) * 100);
  
      updateUserProgress(quiz.id, finalScore.toString(), auth.userId, setError)
        .then((response) => {
          if (response && response.message === 'Attempt added successfully') {
            fetchAndAddUserQuizzes(
              backendApiCall,
              quizzes,
              setQuizzes,
              setError,
              setUserQuizzesUpdated,
              auth
            ).then(() => {
              setUserQuizzesUpdated(true);
            });
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [
    quizFinished,
    answersCorrectness,
    questions.length,
    quiz,
    auth.userId,
    setError,
    userQuizzesUpdated
  ]);

  //reset userQuizUpdated when starting a new quiz
  useEffect(() => {
    setUserQuizzesUpdated(false);
  }, [quizId]);

  const handleSetSelectedOption = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAnswerSelected = (answer, questionIndex) => {
    //updates answerCorrectness array used to conditionally render correct answer components and styles
    const isCorrect = answer === questions[questionIndex].correctOption;
    setAnswersCorrectness((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = { isCorrect };
      return newAnswers;
    });
    // Also update the selectedOptions state
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = answer;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSkipQuestion = (resetCallback, answeredStatus) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    if (!answeredStatus) {
      resetCallback();
    }
  };

  const handleBackQuestion = (resetCallback, answeredStatus) => {
    if (currentQuestionIndex < questions.length && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }

    if (!answeredStatus) {
      resetCallback();
    }
  };

  return (
    <>
      {!quiz ? (
        <Loading />
      ) : (
        <Container sx={containerStyles}>
          {error ? (
            <QuizLoadError />
          ) : (
            <>
              <Typography sx={titleStyles}>{quizTitle}</Typography>
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
                  const correctnessInfo = answersCorrectness[index];
                  const isCurrentQuestion = index === currentQuestionIndex;

                  return (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: correctnessInfo
                          ? correctnessInfo.isCorrect
                            ? '#2e7d32'
                            : '#d32f2f'
                          : 'rgb(211, 209, 209)',
                        border: isCurrentQuestion
                          ? '2px solid #1976d2'
                          : 'none',
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
                    question={questions[currentQuestionIndex].questionText}
                    answer={questions[currentQuestionIndex].correctOption}
                    options={questions[currentQuestionIndex].options}
                    code={questions[currentQuestionIndex].code}
                    resources={questions[currentQuestionIndex].resources}
                    selectedOption={selectedOptions[currentQuestionIndex]}
                    setSelectedOption={handleSetSelectedOption}
                    onAnswerSelected={handleAnswerSelected}
                    onSkipQuestion={handleSkipQuestion}
                    onBackQuestion={handleBackQuestion}
                    userAnswers={answersCorrectness}
                    type={questions[currentQuestionIndex].type}
                    setFinishQuiz={setQuizFinished}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle1" align="center">
                      Good Work! You finished the {quizTitle} quiz!
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                      You got {userPerformance.correctCount} out of{' '}
                      {userPerformance.totalCount} questions correct!
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                      <Button
                        onClick={() => navigate(QUIZZES)}
                        variant="contained"
                        sx={{
                          marginTop: 4,
                        }}
                      >
                        BACK TO QUIZZES
                      </Button>
                    </Grid>
                  </>
                ))}
            </>
          )}
        </Container>
      )}
    </>
  );
}
