import React from 'react';
import {Link} from "@mui/material";
import {LOGIN, SIGNUP} from "App";
import NavBar from "components/NavBar";

export default function Home() {
    return (
        <div>
            <NavBar/>
            <Link href={LOGIN}>Login</Link>
            <Link href={SIGNUP}>Sign up</Link>
        </div>
    );
};
