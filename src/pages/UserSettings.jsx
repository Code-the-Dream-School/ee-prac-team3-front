import React from 'react';
import {Box, Container} from "@mui/material";
import customColors from "../assets/styles";

const UserSettings = () => {
    return (
        <Container sx={{
            minHeight: '88vh',
            backgroundColor: customColors.backgroundLight,
            maxWidth: 'none !important',
            pt: 6,
            pb: 2
        }}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{maxWidth: '1200px'}}>
                Account settings page
            </Box>
            </Box>
        </Container>
    );
};

export default UserSettings;