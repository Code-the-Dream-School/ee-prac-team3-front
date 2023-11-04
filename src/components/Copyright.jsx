import React from 'react';
import {Link, Typography} from "@mui/material";
import {HOME} from "App";

const Copyright = () => {
    return (
        <Typography sx={{mt: 5}} variant="body2" color="text.secondary" align="center">
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