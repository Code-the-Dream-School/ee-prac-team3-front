import React from 'react';
import { Link, Typography } from '@mui/material';
import { HOME } from 'App';
import customColors from 'assets/styles';

const Copyright = () => {
  return (
    <Typography variant="body2" color={customColors.white} align="center">
      {'Copyright © '}
      <Link color="inherit" href={HOME}>
        JSQuiz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
