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
  Typography,
  useMediaQuery,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import customColors, { defaultTheme } from 'assets/styles';
import { LOGIN, RESET_PASSWORD, SIGNUP, port } from 'App';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Copyright from '../components/Copyright';
import { useLocation } from 'react-router-dom';
import backgroundAuth from '../assets/images/background-auth.svg';
import jsQuizLogo from '../assets/images/logo.svg';
import Loading from '../components/Loading';

export default function SignUp() {
  const isMdScreenAndUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const location = useLocation();
  const isAuthPages = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  //updates API with new user registration data
  const addUser = async (newUserData) => {
    const registrationData = {
      firstname: newUserData.firstName,
      lastname: newUserData.lastName,
      email: newUserData.email,
      password: newUserData.password,
      //'quizData' : {}
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    };

    const url = `${port}/api/v1/signup`; // API endpoint here

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return {
        firstName: responseData.data.firstname,
        lastName: responseData.data.lastname,
        email: responseData.data.email,
        id: responseData.data._id,
      };
    } catch (error) {
      throw new Error(error); // Re-throw to be caught in the calling function.
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserDataChange = (field) => (e) => {
    setUserData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleSubmitData = async (event, userData) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const userInfo = await addUser(userData);
      console.log(userInfo);
      setIsLoading(false);
      setUserData({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      }); // Resetting the user data to its initial state.
      navigate(LOGIN);
    } catch (error) {
      setIsLoading(false); // Ensure loading state is reset even on error.
      console.error(error.message);
      // TODO: Provide feedback to the user about the error.
    }
  };

  const onRedirect = (event, nav) => {
    event.preventDefault();
    setUserData({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    });
    navigate(nav);
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
      <Grid container component="main" sx={{ height: '100%' }}>
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundAuth})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={jsQuizLogo}
            variant="square"
            sx={{
              width: '311px',
              height: '139px',
              [defaultTheme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          ></Avatar>
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
            <Avatar sx={{ m: 1, backgroundColor: 'primary.main' }}>
              <LockOutlinedIcon sx={{ color: customColors.white }} />
            </Avatar>
            <Typography component="h1" variant="h5" mb={3}>
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmitData(e, userData)}
              sx={{ mt: 3 }}
            >
              {isLoading && <Loading />}
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
                disabled={isLoading}
                sx={[
                  {
                    '&:hover': { backgroundColor: customColors.greyDark },
                  },
                  {
                    mt: 3,
                    mb: 2,
                    backgroundColor: customColors.blackLight,
                  },
                ]}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href={LOGIN}
                    onClick={(e, LOGIN) => onRedirect()}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Container maxWidth="sm" sx={{ mt: 6 }}>
                {isMdScreenAndUp && isAuthPages && (
                  <Copyright color={customColors.blackMedium} />
                )}
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
