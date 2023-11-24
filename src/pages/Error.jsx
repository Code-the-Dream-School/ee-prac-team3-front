import React from 'react';
import {Box, Container, Typography} from "@mui/material";

export default function Error() {
    return (
        <Container sx={{
            minHeight: '88vh',
            pt: 6,
            pb: 2
        }}>
           <Box>
               <Typography variant={"h3"}>Error 404 :(</Typography>
           </Box>

        </Container>
    );
};