import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useQuiz from '../../quiz/useQuiz';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import QuestionContent from './QuestionContent';
import Loading from 'components/Loading';
import { QUIZZES } from '../../App';
import customColors from 'assets/styles';
import { containerStyles, titleStyles } from '../Main';

export default function QuizContent() {
  const { quizId } = useParams();
  const { quizzes } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [userPerformance, setUserPerformance] = useState({
    correctCount: 0,
    totalCount: 0,
  });

  // Rest of your component logic...
  const quiz = quizzes.find((q) => q.id === quizId);
  const questions = quiz?.questions || [];
  const quizTitle = quiz?.title || '';

  useEffect(() => {
    if (quizFinished) {
      const correctCount = answersCorrectness.filter(
        (answer) => answer && answer.isCorrect
      ).length;
      const totalCount = questions.length;
      setUserPerformance({ correctCount, totalCount });
    }
  }, [quizFinished, answersCorrectness, questions.length]);

  const handleAnswerSelected = (answer, resetCallback) => {
    const isCorrect = answer === questions[currentQuestionIndex].correctOption;
    setAnswersCorrectness((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = { isCorrect };
      return newAnswers;
    });

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
      {!quiz ? (
        <Loading />
      ) : (
        <Container sx={containerStyles}>
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
                question={questions[currentQuestionIndex].questionText}
                answer={questions[currentQuestionIndex].correctOption}
                options={questions[currentQuestionIndex].options}
                code={questions[currentQuestionIndex].code}
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
                <Button
                  component={Link}
                  to={QUIZZES}
                  variant="outlined"
                  sx={[
                    {
                      '&:hover': {
                        borderColor: customColors.white,
                        backgroundColor: '#3f3f3f',
                      },
                    },
                    {
                      borderColor: customColors.white,
                      color: customColors.white,
                      height: '30px',
                    },
                  ]}
                >
                  BACK TO QUIZZES
                </Button>
              </>
            ))}
        </Container>
      )}
    </>
  );
}
