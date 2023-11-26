import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { LOGIN, SIGNUP } from 'App';

export default function Home() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const baseURL = `http://localhost:8000`;

  const checkLoginStatus = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':
      },
      credentials: 'include',
    };

    const url = `${baseURL}/api/v1/login`; // API endpoint

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return {
        firstName: data.firstname,
        lastName: data.lastname,
      };
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':
      },
      credentials: 'include',
    };

    const url = `${baseURL}/api/v1/logout`; // API endpoint

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const userNames = await checkLoginStatus();
        setUserData(userNames);
      } catch (error) {
        console.error(error.message);
        // Handle error in UI, e.g., show a message
      } finally {
        setIsLoading(false);
      }
    };
    authenticateUser();
  }, []);

  return (
    <div>
      <NavBar
        loading={isLoading}
        userData={userData}
        onLogout={logoutUser}
        setUserData={setUserData}
      />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </div>
  );
}
