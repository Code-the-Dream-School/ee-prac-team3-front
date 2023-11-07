import React, {useRef, useState} from 'react';
import {
    Link,
    Paper,
    Box,
    BottomNavigation,
    BottomNavigationAction
} from '@mui/material';
import {LOGIN} from "App";
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

export default function NavBar() {
    const [value, setValue] = useState(0);
    const ref = useRef(null);

    return (
        <Box sx={{pb: 7}} ref={ref}>
            <Paper sx={{position: 'fixed', top: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    {/* The link to the login page has been added for testing purposes and will be replaced as soon as the main page is ready. */}
                    <BottomNavigationAction component={Link} to={LOGIN} label="Quizzes" icon={<SchoolIcon/>}/>
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction label="Notes" icon={<SpeakerNotesIcon/>}/>
                    <BottomNavigationAction label="Help Center" icon={<HelpRoundedIcon/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}