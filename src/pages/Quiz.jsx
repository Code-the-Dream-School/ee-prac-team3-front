import React from 'react';
import {Box} from "@mui/material";

const Quiz = ({quiz, activeFilters}) => {
    const isFilterActive = (filterType, value) => {
        return activeFilters[filterType].length > 0 && activeFilters[filterType].includes(value);
    };
    return (
        <Box sx={{padding: '16px', minWidth: '350px'}}>
            <p> Title: {quiz.title}</p>
            <p>
                <span
                    style={{backgroundColor: isFilterActive('levels', quiz.level) ? 'lightyellow' : 'transparent'}}>{quiz.level}</span>
            </p>
            <p>
                <span
                    style={{backgroundColor: isFilterActive('categories', quiz.category) ? 'lightyellow' : 'transparent'}}>{quiz.category}</span>
            </p>
            <p> {' '}
                {quiz.labels.map((label, index) => (
                    <span key={index}
                          style={{backgroundColor: isFilterActive('labels', label) ? 'lightyellow' : 'transparent'}}> {label}</span>
                ))}
            </p>
        </Box>
    );
};

export default Quiz;