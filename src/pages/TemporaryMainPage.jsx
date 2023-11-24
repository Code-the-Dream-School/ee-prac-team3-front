import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import Quiz from "./Quiz";
import FilterButtonGroup from "../components/FilterButtonGroup";
import customColors, {defaultTheme} from "../assets/styles";

const FakeMainPageContainer = ({quizzes, changeFilter, filterVisible, activeFilters}) => {
    const filterQuizzes = () => {
        return quizzes.filter((q) => {
            const levelFilter = activeFilters.levels.length === 0 || activeFilters.levels.includes(q.level);
            const categoryFilter = activeFilters.categories.length === 0 || activeFilters.categories.includes(q.category);
            const labelsFilter = activeFilters.labels.length === 0 || activeFilters.labels.some((label) => q.labels.includes(label));

            return levelFilter && categoryFilter && labelsFilter;
        });
    };

    const filteredQuizzes = filterQuizzes();

    return (
            <Container sx={{
                minHeight: '85vh',
                backgroundColor: customColors.backgroundLight,
                maxWidth: 'none !important',
                pt: 6,
                pb: 2,
            }}>
                <Typography variant={'h5'}
                            sx={{
                                textTransform: 'uppercase',
                               mb: 2, textAlign: 'center',
                                fontWeight: 'bold',
                                [defaultTheme.breakpoints.down('md')]: {
                                    fontSize: '20px'
                                }
                            }}>Choose a quiz</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{maxWidth: '1200px', display: 'flex', flexDirection: 'column'}}>
                    {quizzes && filterVisible && <FilterButtonGroup changeFilter={changeFilter}/>}
                    {filteredQuizzes.length === 0 && <Typography sx={{
                        mt: 5, textAlign: 'center', color: customColors.greyDark
                    }}>No quizzes were found.</Typography>}
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
}

export default FakeMainPageContainer;