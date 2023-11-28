import * as React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    Checkbox,
    FormControlLabel,
    Container, useMediaQuery
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {LOGIN, RESET_PASSWORD, SIGNUP} from "App";
import customColors from "assets/styles";
import Copyright from "../components/Copyright";
import backgroundAuth from "../assets/images/background-auth.svg"
import jsQuizLogo from '../assets/images/logo.svg';
import {useLocation} from "react-router-dom";

export default function Login() {
    const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const location = useLocation();
    const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(location.pathname);

    const handleSubmit = (event) => {
        event.preventDefault();
        /*//debugging code for testing receiving data from the form, delete when adding functionality
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })*/
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
            }}
        >
            <Grid container component="main" sx={{height: '100%'}}>
                <Grid
                    item
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundAuth})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={jsQuizLogo} variant='square'
                            sx={{
                                width: '311px',
                                height: '139px',
                                display: isMdScreenAndUp ? 'flex' : 'none',
                            }}>
                    </Avatar>
                </Grid>
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                                    <Link href={RESET_PASSWORD} variant="body2" color="primary.main">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={SIGNUP} variant="body2" color="primary.main">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                                <Container maxWidth="sm" sx={{mt: 6}}>
                                    {isMdScreenAndUp && isAuthPages && <Copyright color={customColors.blackMedium}/>}
                                </Container>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}