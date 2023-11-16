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
    InputAdornment,
    IconButton,
    Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import customColors from "assets/styles";
import {LOGIN} from "App";

export default function SignUp() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [userData, setUserData] = React.useState({
        firstName: '',
        lastName:'',
        username: '', 
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

    //updates API with new user registration data
    const addUser = async (newUserData) => {
        const registrationData = {
            'firstname': newUserData.firstName,
            'lastname': newUserData.lastName,
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
            body: JSON.stringify(registrationData)
        };

        const url = `http://localhost:8000/api/v1/signup`; // API endpoint here
            
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
                id: data._id,
                firstname: data.firstname,
                lastname: data.lastname
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

    const handleUserDataChange = (field) => (e) => {
        setUserData(prevData => ({ ...prevData, [field]: e.target.value }));
    }

    const handleSubmitData = async (event, userData) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const userInfo = await addUser(userData);
            console.log(userInfo);
            setIsLoading(false);
            setUserData({
                firstName: '',
                lastName:'',
                username: '', 
                password: '', 
                email: ''
            }); // Resetting the user data to its initial state.
            navigate(LOGIN);
        } catch (error) {
            setIsLoading(false); // Ensure loading state is reset even on error.
            console.error(error.message);
            // TODO: Provide feedback to the user about the error.
        }
    }


    const onLoginRedirect = ()=>{
        alert(`Let's go to the Login Page!`)
        setUserData({
            firstName: '',
            lastName:'',
            username: '', 
            password: '', 
            email: ''
        });
    }

    const onForgotPassword = (data)=>{
        alert(`lets rest the password for ${data.username}!`)
        setUserData({
            firstName: '',
            lastName:'',
            username: '', 
            password: '', 
            email: ''
        });
    }

    console.log(userData);

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
                        <Box component="form" noValidate onSubmit={(e) => handleSubmitData(e, userData)} sx={{mt: 3}}>
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
                                        onChange={handleUserDataChange('firstName')}
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
                                        onChange={handleUserDataChange('lastName')}
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
                                        onChange={handleUserDataChange('email')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        id="password"
                                        autoComplete="new-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleUserDataChange('password')}
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
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading} // Disable button when loading
                                sx={[
                                    {
                                        '&:hover': {backgroundColor: customColors.greyDark}
                                    },
                                    {
                                        mt: 3, mb: 2, backgroundColor: customColors.blackLight,
                                    },
                                ]}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={LOGIN} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}