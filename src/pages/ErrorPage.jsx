import React from 'react';
import {HOME} from "App";
import {Link} from "@mui/material";

export default function ErrorPage() {
    return (
        <div>
            Error 404 :(
            <Link href={HOME}>Go to home page</Link>
        </div>
    );
};