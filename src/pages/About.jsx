import React from 'react';
import {Box, Typography} from "@mui/material";
import c from "../App.module.css";

const About = () => {
    return (
        <Box sx={{
            height: '88vh',
        }}>
            <Box className={c.container}>
                <Typography>Some info about our project will be here. =)</Typography>
            </Box>
        </Box>
    );
};

export default About;