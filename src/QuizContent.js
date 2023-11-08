import React, { useState, useEffect } from 'react';
import {Container, Typography, RadioGroup, FormControlLabel, Radio, Button} from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2'


function QuestionContent({ question, options, onAnswerSelected, onSkipQuestion, onBackQuestion}) {
    const [selected, setSelected] = useState('');
    const resetSelection = () => {
        setSelected('');
    }

    return (
        <Container>
            <Typography variant="h5" align="left" sx = {{pl:2, pb:2}}>{question}</Typography>
            <RadioGroup
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                style = {{
                    paddingLeft:"10px"
                }}
                id = "answer-choices"
            >
                <Grid container spacing={2}>
                {options && options.length > 0 ? 
                    options.map((option, index) => (
                        <Grid item xs={12} key={index}>
                            <Box component = "div" sx={{
                                pl: 2, 
                                border: '2px solid rgb(223, 221, 221)',
                                width: '100%',
                                borderRadius: 1,
                                boxSizing:'border-box'
                            }}>
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                            </Box>
                        </Grid>
                    )) : <div> </div>
                }
                </Grid>
            </RadioGroup>
            <div style ={{
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between' 
            }}>
                <div>
                    <Button variant = "outlined" onClick={() => onBackQuestion(resetSelection)} sx={{mt:5, ml:1}}>
                        Previous Question
                    </Button>
                    <Button variant = "outlined" onClick={() => onSkipQuestion(resetSelection)} sx={{mt:5, ml:1}}>
                        Next Question
                    </Button>
                </div>

                <Button variant = "contained" onClick={() => onAnswerSelected(selected, resetSelection)} sx={{m:0, mt:5}}>
                    Submit Answer
                </Button>
            </div>
        </Container>
    );
}

export default function QuizContent () {

    const [questions, setQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchQuizData = async () => {
        const options = {
            method: "GET",
            headers: 
                {Authorization: `Bearer ${null}`}
        };

        const url = ''

        try {
            const response = await fetch(url, options)
            if(!response.ok){
                console.log(response);
                const errMessage = `${response.status}`
                throw new Error(errMessage);
            }

            const quizData = await response.json();

            return quizData;
        } catch (error) {
            console.log(error.message);
        }
    }

   useEffect(()=> {
   //    const fetchQuiz = async function () {
    //        try {
    //            const quizQs = await fetchQuizData();
               
    //            const fetchedQuestions = await fetchQuizData();
    
    //            setQuestions(fetchedQuestions);
    
    //        } catch (error) {
    //            console.error(error.message);
    //        }
    //    }
        const title = "Addition Quiz"    

        const quizQs = [            
            { id: 1, question: "2+2 equals:", options: [3, 4, 5, 6], correctAnswer: 4, userAnswer: null, isCurrentQ:null },
            { id: 2, question: "2+3 equals:", options: [3, 4, 5, 6], correctAnswer: 5, userAnswer: null, isCurrentQ:null},
            { id: 3, question: "2+4 equals:", options: [3, 4, 5, 6], correctAnswer: 6, userAnswer: null, isCurrentQ:null},
            { id: 4, question: "2+1 equals:", options: [3, 4, 5, 6], correctAnswer: 3, userAnswer: null, isCurrentQ:null}
        ];

        setQuestions(quizQs);
        setQuizTitle(title);
    }, [])

    const handleAnswerSelected = (answer, resetCallback) => {
        const selectedAnswer = parseInt(answer, 10);
        console.log("Selected answer:", selectedAnswer);
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].userAnswer = selectedAnswer;
        setQuestions(updatedQuestions);

        //changes to the next question if more questions exist
        if(currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }

        resetCallback();
    };

    const handleSkipQuestion = (resetCallback) => {
        //changes to the next question if more questions exist
        if(currentQuestionIndex < questions.length-1) {
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }

        resetCallback();
    };

    const handleBackQuestion = (resetCallback) => {
        //changes to the next question if more questions exist
        if(currentQuestionIndex < questions.length && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex-1);
        }

        resetCallback();
    };

    return (
        <>
            <Container maxWidth = "md">
                <Typography variant='h4' sx={{pl:4, pb:2}}>{quizTitle}</Typography>
                <Container style ={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: "left",
                    paddingInline: "30px",
                    paddingBottom: "20px"
                }}>
                    <Typography variant="body2" sx={{color:'rgb(223, 221, 221)', pl:2, pr:2}}>
                        {currentQuestionIndex < questions.length 
                            ? `${currentQuestionIndex + 1} of ${questions.length}` 
                            : `${currentQuestionIndex} of ${questions.length}`
                        }
                    </Typography>
                    {questions.map((q, index) => {
                        const correct = q.userAnswer === q.correctAnswer;
                        const isCurrentQuestion = index === currentQuestionIndex;
                        console.log(q.userAnswer, q.correctAnswer, correct);
                        return (
                            <div key={q.id} style={{
                                backgroundColor: !q.userAnswer ? 'rgb(211, 209, 209)' : correct ? '#2e7d32' : '#d32f2f',
                                border: isCurrentQuestion ? '2px solid #1976d2' : 'none',
                                borderRadius: '50%',
                                width: 9,
                                height: 9,
                                margin: 6,
                                display: 'inline-block'
                            }}>
                            </div>
                        );
                    })}
                </Container>
                {questions.length > 0 && (
                    currentQuestionIndex < questions.length ? 
                        <QuestionContent
                            question={questions[currentQuestionIndex].question}
                            options={questions[currentQuestionIndex].options}
                            onAnswerSelected={handleAnswerSelected}
                            onSkipQuestion= {handleSkipQuestion}
                            onBackQuestion={handleBackQuestion}
                        />
                    :
                        <Typography variant="subtitle1" align ="left">Good Work! You finished the {quizTitle}!</Typography>
            )}
            </Container>
        </>
    );
}