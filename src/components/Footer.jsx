import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Copyright from "./Copyright";
import customColors from "../styles";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? customColors.blackLight
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Copyright color={customColors.white}/>
            </Container>
        </Box>
    )
};