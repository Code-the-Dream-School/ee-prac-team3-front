import React from 'react';
import {Box, Typography} from "@mui/material";
import c from "../App.module.css";
import {defaultTheme} from "../assets/styles";

const Library = () => {
    return (
        <Box sx={{
            height: '88vh',
        }}>
            <Typography variant={'h5'}
                        sx={{
                            textTransform: 'uppercase',
                            mt: 6, mb: 2, textAlign: 'center',
                            fontWeight: 'bold',
                            [defaultTheme.breakpoints.down('md')]: {
                                fontSize: '20px'
                            }
                        }}>Library</Typography>
            <Box className={c.container}>

            </Box>
        </Box>
    );
};

export default Library;