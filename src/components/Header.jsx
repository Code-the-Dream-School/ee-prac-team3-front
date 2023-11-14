import React from 'react';
import {styled, alpha} from '@mui/material/styles';
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Container,
    InputBase, Divider
} from "@mui/material";
import logo from "assets/images/logo.svg"
import customColors from "assets/styles";
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: '20px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header({profileSettings, userData}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    //user menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //user icon
    const stringAvatar = (name) => {
        return {
            sx: {
                backgroundColor: 'primary.main',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    };

    return (
        <AppBar position="static" sx={{backgroundColor: customColors.blackLight}}>
            <Container sx={{maxWidth: '1200px'}}>
                <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                    <img src={logo} style={{
                        width: '100px',
                        marginRight: '20px',
                        flexGrow: 0
                    }}/>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <InfoOutlinedIcon sx={{marginRight: '20px'}}/>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Account info">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar
                                    alt="User avatar" {...stringAvatar(`${userData.firstName} ${userData.lastName}`)}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Typography>{`${userData.firstName}${userData.lastName}`}</Typography>
                            <Typography>{userData.email}</Typography>
                            <Divider/>
                            {profileSettings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
};