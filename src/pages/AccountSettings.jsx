import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import customColors, { defaultTheme } from '../assets/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import useAuth from "../auth/useAuth";
import {port} from "../App";

const AccountSettings = ({ userData }) => {
  const { auth, setAuth } = useAuth();
  const [formValues, setFormValues] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with values:', formValues);
    /*const payload = {
            firstname: formValues.firstName,
            lastname: formValues.lastName,
            email: formValues.email,
            password: formValues.currentPassword,
            confirmPassword: formValues.newPassword,
        };

        const url = `${port}/api/v1/updateuser`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update account information');
            }
            setAuth({
                ...auth,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.currentPassword,
                confirmPassword: formValues.newPassword,
            });

            console.log('Account information updated successfully');
        } catch (error) {
            console.error('Error updating account information:', error.message);
        }*/
  };

  return (
    <Container
      sx={{
        minHeight: '95vh',
        backgroundColor: customColors.backgroundLight,
        maxWidth: 'none !important',
        pt: 6,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            width: '80%',
            [defaultTheme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  width: '100px',
                  height: '100px',
                  bgcolor: customColors.grey,
                }}
              >
                <AddAPhotoIcon sx={{ color: customColors.white }} />
              </Avatar>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          firstName: e.target.value,
                        })
                      }
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      value={formValues.lastName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          lastName: e.target.value,
                        })
                      }
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
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="currentPassword"
                      label="Current password"
                      type="password"
                      id="currentPassword"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="New password"
                      type="password"
                      id="newPassword"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 5 }}
                >
                  Save changes
                </Button>
                <Grid textAlign={'justify'}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to reset account progress and I understand that it can't be reverted."
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 5 }}
                >
                  Reset account progress
                </Button>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to delete my account."
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Delete account
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountSettings;
