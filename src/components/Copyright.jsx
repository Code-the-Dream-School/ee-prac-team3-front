import React from 'react';
import {Link, Typography} from "@mui/material";

const Copyright = () => {
    return (
        <Typography sx={{mt: 5}} variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                JSQuiz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;