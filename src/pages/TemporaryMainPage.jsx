import React, {useMemo} from 'react';
import {Box, Container, Typography} from "@mui/material";
import Quiz from "./Quiz";
import FilterButtonGroup from "../components/FilterButtonGroup";
import customColors, {defaultTheme} from "../assets/styles";

const containerStyles = {
    minHeight: '100vh',
    backgroundColor: customColors.backgroundLight,
    maxWidth: 'none !important',
    pt: 6,
    pb: 2,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const QuizzesContainer = ({title, quizzes, activeFilters, changeFilter, message}) => {
    const filteredQuizzes = useMemo(() => {
        return quizzes.filter(({level, category, labels}) => {
            const levelFilter = activeFilters.levels.length === 0 || activeFilters.levels.includes(level);
            const categoryFilter = activeFilters.categories.length === 0 || activeFilters.categories.includes(category);
            const labelsFilter = activeFilters.labels.length === 0 || activeFilters.labels.some((label) => labels.includes(label));

            return levelFilter && categoryFilter && labelsFilter;
        });
    }, [quizzes, activeFilters]);

    return (
        <Container sx={containerStyles}>
            <Typography variant="h5" sx={titleStyles}>
                {title}
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={boxStyles}>
                    {quizzes && <FilterButtonGroup changeFilter={changeFilter}/>}
                    {filteredQuizzes.length === 0 && <Typography sx={messageStyles}>{message}</Typography>}
                    {filteredQuizzes.length > 0 && (
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            {filteredQuizzes.map((q) => (
                                <Quiz key={q.id} quiz={q} activeFilters={activeFilters}/>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export const Quizzes = ({quizzes, changeFilter, activeFilters}) => (
    <QuizzesContainer
        title="Choose a quiz"
        quizzes={quizzes}
        activeFilters={activeFilters}
        changeFilter={changeFilter}
        message="No quizzes were found."
    />
);

export const Favorites = ({favoriteQuizzes, changeFilter, activeFilters}) => (
    <QuizzesContainer
        title="Your favorite quizzes"
        quizzes={favoriteQuizzes}
        activeFilters={activeFilters}
        changeFilter={changeFilter}
        message="Save your favorite quizzes so they are here."
    />
);