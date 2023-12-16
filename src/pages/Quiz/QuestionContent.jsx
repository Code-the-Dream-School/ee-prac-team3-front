import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Container,
  Typography,
  RadioGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
} from '@mui/material';
import checkRadioRender from './CheckRadioRender';

export default function QuestionContent({
  question,
  code,
  options,
  onAnswerSelected,
  onSkipQuestion,
  onBackQuestion,
  index,
  length,
  selectedOption,
  setSelectedOption,
  type,
  userAnswers,
  resources,
  questionId,
  setFinishQuiz,
}) {
  const [selected, setSelected] = useState(
    type === 'check-box'
      ? Array.isArray(selectedOption)
        ? selectedOption
        : []
      : selectedOption || null
  );
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showFinalQModal, setShowFinalQModal] = useState(false);

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const resetSelection = () => {
    setSelected('');
  };

  const isCurrentQuestionAnswered = answeredQuestions.has(questionId);

  const handleNextQuestion = () => {
    if (!selected && !isCurrentQuestionAnswered) {
      setShowWarningModal(true);
    } else {
      onSkipQuestion(resetSelection, isCurrentQuestionAnswered);
    }
  };

  const handleSubmitAnswer = () => {
    //if user submits an answer questionId is add to Set used for tracking answered questions
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
    onAnswerSelected(selected, index);
  };

  const handleSubmitTest = () => {
    const hasUnansweredQuestions =
      userAnswers.length !== length || userAnswers.includes(undefined);
    if (hasUnansweredQuestions) {
      setShowFinalQModal(true);
    } else {
      setFinishQuiz(true);
    }
  };

  const correctnessInfo = userAnswers[index];
  const checkbox = 'check-box';

  return (
    <Container>
      <Typography variant="h5" align="left" sx={{ pl: 2, pb: 2 }}>
        {question}
      </Typography>
      {code && (
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {code}
        </SyntaxHighlighter>
      )}
      {type === checkbox ? (
        <FormGroup>
          {checkRadioRender(
            options,
            checkbox,
            selected,
            setSelected,
            isCurrentQuestionAnswered,
            correctnessInfo,
            setSelectedOption
          )}
        </FormGroup>
      ) : (
        <RadioGroup
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value)}
          disabled={isCurrentQuestionAnswered}
          style={{ paddingLeft: '10px' }}
          id="answer-choices"
        >
          {checkRadioRender(
            options,
            'radio',
            selected,
            setSelected,
            isCurrentQuestionAnswered,
            correctnessInfo,
            setSelectedOption
          )}
        </RadioGroup>
      )}
      {isCurrentQuestionAnswered &&
        correctnessInfo &&
        (correctnessInfo.isCorrect ? (
          <Typography> Nice work! </Typography>
        ) : (
          <>
            <Typography> Sorry, that is incorrect. </Typography>
            {resources && (
              <Typography>
                You can learn more about this topic at the following links:
                {resources}
              </Typography>
            )}
          </>
        ))}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {index > 0 && (
            <Button
              variant="outlined"
              onClick={() =>
                onBackQuestion(resetSelection, isCurrentQuestionAnswered)
              }
              sx={{ mt: 5, ml: 1 }}
            >
              Previous Question
            </Button>
          )}
          {index < length - 1 && (
            <Button
              variant="outlined"
              onClick={handleNextQuestion}
              sx={{ mt: 5, ml: 1 }}
            >
              Next Question
            </Button>
          )}
        </div>
        <Button
          variant="contained"
          disabled={isCurrentQuestionAnswered || !selected}
          onClick={handleSubmitAnswer}
          sx={{ m: 0, mt: 5 }}
        >
          Submit Answer
        </Button>
        {(index === length - 1 || userAnswers.length === length) && (
          <Button
            variant="contained"
            onClick={handleSubmitTest}
            sx={{ m: 0, mt: 5 }}
          >
            Submit Test
          </Button>
        )}
      </div>
      {showWarningModal && (
        <Dialog
          open={showWarningModal}
          onClose={() => setShowWarningModal(false)}
        >
          <DialogTitle>{'Skip Question'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to skip this question?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowWarningModal(false)}>Cancel</Button>
            <Button
              onClick={() => {
                onSkipQuestion(resetSelection);
                setShowWarningModal(false);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showFinalQModal && (
        <Dialog
          open={showFinalQModal}
          onClose={() => setShowFinalQModal(false)}
        >
          <DialogContent>
            <DialogContentText>
              You still have questions left unanswered, would you like to submit
              (unanswered questions will be counted as incorrect)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFinalQModal(false)}>Go Back</Button>
            <Button
              onClick={() => {
                setFinishQuiz(true);
                setShowFinalQModal(false);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
