import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import {RESET_PASSWORD, SIGNUP, HOME} from "App";
import customColors from "assets/styles";

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginData, setLoginData] = React.useState({
        //username: '', 
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        firstName: null,
        lastName: null,
        username: null, 
        password: null, 
        email: null
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    //signs user in with credentials
    const loginUser = async (newUserData) => {
        const loginData = {
            //'username': newUserData.username,
            'email': newUserData.email,
            'password': newUserData.password,
            //'quizData' : {}
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //'Authorization': `Bearer YOUR_TOKEN` 
            },
            body: JSON.stringify(loginData),
            credentials: 'include' 
        };

        const url = `http://localhost:8000/api/v1/login`; // API endpoint here
            
        try {
            const response = await fetch(url, options);
            if(!response.ok) {
                const errorMessage = `Error: ${response.status} - ${response.statusText}`;
                const responseBody = await response.json(); 
                console.error(errorMessage, responseBody); 
                throw new Error(errorMessage);
            }
            const data = await response.json();
            return {
                success: data.success,
                message:data.message
            };
        } catch (error) {
            console.error(error.message); // Using console.error for errors.
            throw error; // Re-throw to be caught in the calling function.
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const handleLoginDataChange = (field) => (e) => {
        setLoginData(prevData => ({ ...prevData, [field]: e.target.value }));
    }

    const handleSubmitData = async (event, loginData) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const apiStatus = await loginUser(loginData);
            console.log(apiStatus);
            setIsLoading(false);
            setLoginData({
                //username: '', 
                email: '',
                password: ''
            }); // Resetting the login data to its initial state.
            navigate(HOME);
        } catch (error) {
            setIsLoading(false); // Ensure loading state is reset even on error.
            console.error(error.message);
            // TODO: Provide feedback to the user about the error.
        }
    }

    const onSignupRedirect = ()=>{
        setLoginData({
           //username: '', 
            password: '', 
            email: ''
        });
    }

    const onForgotPassword = ()=>{
        setLoginData({
            //username: '', 
            password: '', 
            email: ''
        });
    }

    return (
        <>
            <Grid container component="main" sx={{height: '100vh'}}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, backgroundColor: "primary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={(e) => handleSubmitData(e, loginData)} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleLoginDataChange('email')}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleLoginDataChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={[{
                                    '&:hover': {backgroundColor: customColors.greyDark}
                                },
                                    {
                                        mt: 3, mb: 2, backgroundColor: customColors.blackLight,
                                    },
                                ]}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href={RESET_PASSWORD} onClick={onForgotPassword} variant="body2" color="primary.main">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={SIGNUP} onClick={onSignupRedirect} variant="body2" color="primary.main">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}