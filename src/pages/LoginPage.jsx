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
    FormControlLabel
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import customColors from "styles";
import Copyright from "components/Copyright";
import {RESET_PASSWORD, SIGNUP} from "App";

export default function LoginPage() {
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
                            </Grid>
                            <Copyright/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}