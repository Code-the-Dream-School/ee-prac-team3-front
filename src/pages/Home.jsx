import React, { useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import NavBar from "components/NavBar";
import { LOGIN, SIGNUP } from "App";

export default function Home() {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkLoginStatus = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //'Authorization': 
            },
            credentials: 'include'
        };

        const url = `http://localhost:8000/api/v1/getuser`; // API endpoint
            
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
                firstName: data.firstname,
                lastName:data.lastname
            };
        } catch (error) {
            console.error(error.message); 
            throw error; 
        }
    }

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
        }
        authenticateUser();
    }, []);

    const renderAuthButtons = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (userData.firstName) {
            return `Hello ${userData.firstName}`;
        }
        return (
            <>
                <Button onClick={() => navigate(LOGIN)} variant="outlined">Login</Button>
                <Button onClick={() => navigate(SIGNUP)} variant="outlined">Sign up</Button>
            </>
        );
    };

    return (
        <div>
            <NavBar />
            <Grid container 
                spacing={2} 
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Grid item>
                    {renderAuthButtons()}
                </Grid>
            </Grid>
        </div>
    );
};