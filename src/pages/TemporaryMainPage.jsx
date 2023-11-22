import React from 'react';
import {Box, Typography} from "@mui/material";
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
        <Box sx={{
            minHeight: '85vh',
        }}>
            <Typography variant={'h5'}
                        sx={{
                            textTransform: 'uppercase',
                            mt: 6, mb: 2, textAlign: 'center',
                            fontWeight: 'bold',
                            [defaultTheme.breakpoints.down('md')]: {
                                fontSize: '20px'
                            }
                        }}>Choose a quiz</Typography>
            <Box sx={{maxWidth: '1200px', margin: '0 auto'}}>
            {quizzes && filterVisible && <FilterButtonGroup changeFilter={changeFilter}/>}
                {filteredQuizzes.length === 0 && <Typography sx={{mt: 5, textAlign:'center', color: customColors.greyDark
                }}>No quizzes were found.</Typography>}
                {filteredQuizzes.length > 0 && (
                    <Box sx={{width: '100%'}}>
                        {filteredQuizzes.map((q) => (
                            <Quiz key={q.id} quiz={q} activeFilters={activeFilters}/>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default FakeMainPageContainer;