import React from 'react';
import {Link} from "@mui/material";
import {LOGIN, SIGNUP} from "App";
import NavBar from "components/NavBar";
import Header from "../components/Header";

const profileSettings = ['Account', 'Logout'];
const userData={
    firstName: "Katsiaryna",
    lastName: "Lashcheuskaya",
    email: "test@test.com",
}

export default function Home() {
    return (
        <div>
            <Header profileSettings={profileSettings} userData={userData}/>
            <NavBar/>
           {/* <Link href={LOGIN}>Login</Link>
            <Link href={SIGNUP}>Sign up</Link>*/}
        </div>
    );
};
