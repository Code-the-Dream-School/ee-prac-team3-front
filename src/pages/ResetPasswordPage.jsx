import * as React from 'react';
import {
    Button,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@mui/material';
import customColors from "styles";
import Copyright from "components/Copyright";
import {LOGIN} from "App";

export default function ResetPasswordPage () {
    const handleSubmit = (event) => {
        event.preventDefault();
        /*//debugging code for testing receiving data from the form, delete when adding functionality
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
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
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
                            flexDirection: 'column'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Forgot password
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit}
                             sx={{
                                 mt: 1,
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center'
                             }}
                        >
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
                                Send reset link
                            </Button>
                            <Grid item sx={{width:"100%", display: "flex", flexDirection:"column", alignItems:"self-end"}}>
                                <Link href={LOGIN} variant="body2" color="primary.main">
                                    {"Go to Sign in page"}
                                </Link>
                            </Grid>
                            <Copyright/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}