import React from 'react';
import {Link} from "@mui/material";
import {LOGIN, SIGNUP} from "App";

export default function HomePage() {
    return (
        <div>
            <Link href={LOGIN}>Login</Link>
            <Link href={SIGNUP}>Sign up</Link>
        </div>
    );
};
