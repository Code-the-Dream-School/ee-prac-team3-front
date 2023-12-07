import * as React from 'react';
import {
  Box,
  Link,
  Button,
  Grid,
  Container,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userData, setUserData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = React.useState({
    firstName: null,
    lastName: null,
    username: null,
    password: null,
    email: null,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  //updates API with new user registration data
  const addUser = async (newUserData) => {
    const registrationData = {
      firstName: newUserData.firstName,
      lastName: newUserData.LastName,
      username: newUserData.username,
      email: newUserData.email,
      password: newUserData.password,
      quizData: {},
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer YOUR_TOKEN`
      },
      body: JSON.stringify(registrationData),
    };

    const url = ``; // API endpoint here

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        const responseBody = await response.json();
        console.error(errorMessage, responseBody);
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return {
        id: data.id,
        username: data.username,
        quizData: data.quizData,
      };
    } catch (error) {
      console.error(error.message); // Using console.error for errors.
      throw error; // Re-throw to be caught in the calling function.
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserDataChange = (field) => (e) => {
    setUserData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleSubmitData = async () => {
    try {
      setIsLoading(true);
      const userInfo = await addUser(userData);
      // TODO: Do something with userInfo if needed.
      setIsLoading(false);
      setUserData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
      }); // Resetting the user data to its initial state.
      // TODO: Provide feedback to the user or navigate them elsewhere.
    } catch (error) {
      setIsLoading(false); // Ensure loading state is reset even on error.
      console.error(error.message);
      // TODO: Provide feedback to the user about the error.
    }
  };

  const onSubmitData = (data) => {
    alert(`welcome ${data.username}!`);
    setUserData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
    });
  };
  const onLoginRedirect = () => {
    alert(`Let's go to the Login Page!`);
    setUserData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
    });
  };

  const onForgotPassword = (data) => {
    alert(`lets rest the password for ${data.username}!`);
    setUserData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
    });
  };

  console.log(userData);

  return (
    <Container maxWidth="md" style={{ minWidth: '500px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Create Your Account</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              boxSizing: 'border-box',
            }}
          >
            <TextField
              id="input-first-name"
              label="First Name"
              variant="standard"
              fullWidth
              onChange={handleUserDataChange('firstName')}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              boxSizing: 'border-box',
            }}
          >
            <TextField
              id="input-last-name"
              label="Last Name"
              variant="standard"
              fullWidth
              onChange={handleUserDataChange('lastName')}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              boxSizing: 'border-box',
            }}
          >
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id="input-username"
              label="Username"
              variant="standard"
              fullWidth
              onChange={handleUserDataChange('username')}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              boxSizing: 'border-box',
            }}
          >
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id="input-email"
              label="Email"
              variant="standard"
              fullWidth
              onChange={handleUserDataChange('email')}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            sx={{ m: 1, width: '100%', boxSizing: 'border-box' }}
            variant="standard"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
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
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ paddingTop: '20px', paddingLeft: '5px' }}>
        <Button
          variant="contained"
          color="info"
          onClick={() => onSubmitData(userData)}
          fullWidth
        >
          Register
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingTop: '10px',
          paddingInline: '15px',
        }}
      >
        <Link href="#" onClick={() => onLoginRedirect()}>
          Login Instead
        </Link>
      </div>
    </Container>
  );
}
