import * as React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography, Container, useMediaQuery
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import customColors, {defaultTheme} from "assets/styles";
import {LOGIN, RESET_PASSWORD, SIGNUP} from "App";
import Copyright from "../components/Copyright";
import {useLocation} from "react-router-dom";
import backgroundAuth from "../assets/images/background-auth.svg";
import jsQuizLogo from "../assets/images/logo.svg";

export default function SignUp() {
    const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const location = useLocation();
    const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(location.pathname);

    const handleSubmit = (event) => {
        event.preventDefault();
        /*//debugging code for testing receiving data from the form, delete when adding functionality
        const data = new FormData(event.currentTarget);
         console.log({
             firstName: data.get('firstName'),
             lastName: data.get('lastName'),
             email: data.get('email'),
             password: data.get('password'),
         });*/
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Set the height to cover the full viewport height
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
                    <Avatar src={jsQuizLogo} variant='square' sx={{ width: '311px',
                        height: '139px',
                        [defaultTheme.breakpoints.down('md')]: {
                            display: 'none',
                        },
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
                        <Avatar sx={{m: 1, backgroundColor: 'primary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={LOGIN} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            <Container maxWidth="sm" sx={{mt:6}} >
                                {isMdScreenAndUp && isAuthPages && <Copyright color={customColors.blackMedium}/>}
                            </Container>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}