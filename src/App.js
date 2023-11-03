import React from 'react';
import LoginPage from "./pages/LoginPage";
import {defaultTheme} from "./styles";
import {CssBaseline, Grid, ThemeProvider} from "@mui/material";

const URL = 'http://localhost:8000/api/v1/';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <LoginPage/>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
