import React from 'react';
import { FormControlLabel, Radio, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';

export default function checkRadioRender(
  options,
  questionType,
  selected,
  setSelected,
  isCurrentQuestionAnswered
) {
  const checkbox = 'check-box';
  const handleOptionClick = (option) => {
    if (!isCurrentQuestionAnswered) {
      if (questionType === checkbox) {
        setSelected((prevSelected) =>
          prevSelected.includes(option)
            ? prevSelected.filter((item) => item !== option)
            : [...prevSelected, option]
        );
      } else {
        setSelected(option);
      }
    }
  };

  return options.map((option, index) => (
    <Grid item xs={12} key={index}>
      <Box
        component="div"
        onClick={() => handleOptionClick(option)}
        sx={{
          pl: 2,
          border: '2px solid rgb(223, 221, 221)',
          width: '100%',
          borderRadius: 1,
          boxSizing: 'border-box',
          cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
        }}
      >
        <FormControlLabel
          control={
            questionType === checkbox ? (
              <Checkbox
                checked={selected.includes(option)}
                value={option}
                disabled={isCurrentQuestionAnswered}
              />
            ) : (
              <Radio
                checked={selected === option}
                value={option}
                disabled={isCurrentQuestionAnswered}
              />
            )
          }
          label={option}
          sx={{
            width: '100%', // Ensure label takes the full width of the box
            userSelect: 'none', // Prevent text selection on double click
          }}
        />
      </Box>
    </Grid>
  ));
}
