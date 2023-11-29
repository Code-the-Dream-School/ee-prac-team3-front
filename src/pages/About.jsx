import React from 'react';
import {Box, Container, Typography} from "@mui/material";

const About = () => {
    return (
        <Container sx={{
            minHeight: '88vh',
            pt: 6,
            pb: 2
        }}>
            <Box>
                <Typography>Some info about our project will be here. =)</Typography>
            </Box>
        </Container>
    );
};

export default About;