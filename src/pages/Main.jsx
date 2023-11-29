import React, {useMemo} from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import Quiz from "./Quiz";
import FilterButtonGroup from "../components/FilterButtonGroup";
import customColors, {defaultTheme} from "../assets/styles";
import "./Main.css";

const containerStyles = {
    minHeight: '85vh',
    backgroundColor: customColors.backgroundLight,
    maxWidth: 'none !important',
    pt: 6,
    pb: 6,
};
const titleStyles = {
    textTransform: 'uppercase',
    mb: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    [defaultTheme.breakpoints.down('md')]: {
        fontSize: '20px',
    },
};
const messageStyles = {
    mt: 5,
    textAlign: 'center',
    color: customColors.greyDark,
};
const boxStyles = {
    maxWidth: '1200px',
};

const QuizzesContainer = ({title, quizzes, activeFilters, changeFilter, message, quizProgress}) => {
    const getProgressForQuiz = (quizId) => {
        const progressObj = quizProgress.find((p) => p.quizId === quizId);
        return progressObj ? progressObj : 0;
    }
    const filteredQuizzes = useMemo(() => {
        return quizzes.filter(({level, category, labels}) => {
            const levelFilter = activeFilters.levels.length === 0 || activeFilters.levels.includes(level);
            const categoryFilter = activeFilters.categories.length === 0 || activeFilters.categories.includes(category);
            const labelsFilter = activeFilters.labels.length === 0 || activeFilters.labels.some((label) => labels.includes(label));

            return levelFilter && categoryFilter && labelsFilter;
        });
    }, [quizzes, activeFilters]);

    const quizzesLength = filteredQuizzes.length;

    return (
        <Container sx={containerStyles}>
            <Typography variant="h5" sx={titleStyles}>
                {title}
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={boxStyles}>
                    {quizzes && <FilterButtonGroup changeFilter={changeFilter}/>}
                    {quizzesLength === 0 && <Typography sx={messageStyles}>{message}</Typography>}
                    {quizzesLength > 0 && (
                        <Box sx={{ py: 3 }} maxWidth="lg">
                            <Grid container spacing={4}>
                            {filteredQuizzes.map((q) => (
                                <Quiz key={q.id} quiz={q} activeFilters={activeFilters} getProgressForQuiz={getProgressForQuiz} quizzesLength={quizzesLength}/>
                            ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export const Quizzes = ({quizzes, changeFilter, activeFilters, quizProgress}) => (
    <QuizzesContainer
        title="Choose a quiz"
        quizzes={quizzes}
        activeFilters={activeFilters}
        changeFilter={changeFilter}
        quizProgress={quizProgress}
        message="No quizzes were found."
    />
);

export const Favorites = ({favoriteQuizzes, changeFilter, activeFilters, quizProgress}) => (
    <QuizzesContainer
        title="Your favorite quizzes"
        quizzes={favoriteQuizzes}
        activeFilters={activeFilters}
        changeFilter={changeFilter}
        quizProgress={quizProgress}
        message="Save your favorite quizzes so they are here."
    />
);