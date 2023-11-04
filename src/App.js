import React from 'react';
import {defaultTheme} from "./styles";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Footer from "./components/Footer";

/*// URL for quick access to the server
const URL = 'http://localhost:8000/api/v1/';*/

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                {/*<LoginPage/>*/}
                {/*<SignUpPage/>*/}
                {/*<ResetPasswordPage/>*/}
            <Footer/>
        </ThemeProvider>
    );
}

export default App;
