import React from 'react';
import {Link, Typography} from "@mui/material";

const Copyright = (props) => {
    const {color} = props
    return (
        <Typography variant="body2" color={color} align="center">
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