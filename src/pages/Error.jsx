import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import c from "App.module.css"

export default function Error() {
    return (
       <Grid container sx={{height: '88vh', }}>
           <Box className={c.container}>
               <Typography variant={"h3"}>Error 404 :(</Typography>
           </Box>

        </Grid>
    );
};