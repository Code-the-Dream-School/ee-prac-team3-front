import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import customColors, {defaultTheme} from "../assets/styles";

const Notes = () => {
    return (
        <Container sx={{
            minHeight: '85vh',
            backgroundColor: customColors.backgroundLight,
            maxWidth: 'none !important',
            pt: 6,
            pb: 2
        }}>
            <Typography variant={'h5'}
                        sx={{
                            textTransform: 'uppercase',
                            mb: 2, textAlign: 'center',
                            fontWeight: 'bold',
                            [defaultTheme.breakpoints.down('md')]: {
                                fontSize: '20px'
                            }
                        }}>Notes will be here</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{maxWidth: '1200px', display: 'flex', flexDirection: 'column'}}>

                </Box>
            </Box>
        </Container>
    );
};

export default Notes;