import React from 'react';
import {defaultTheme} from "./styles";
import {CssBaseline, Grid, ThemeProvider} from "@mui/material";
import SignUpPage from "./pages/SignUpPage";

const URL = 'http://localhost:8000/api/v1/';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                {/*<LoginPage/>*/}
                <SignUpPage/>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
