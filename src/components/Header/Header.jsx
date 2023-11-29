import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Divider,
  Button,
} from '@mui/material';
import jsQuizLogo from '../../assets/images/logo.svg';
import customColors, { defaultTheme } from 'assets/styles';
import Search from './Search';
import AboutElement from './AbouElement';
import {
  HOME,
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  QUIZZES,
  FAVORITES,
  NOTES,
  ERROR,
  LIBRARY,
  ABOUT,
  USER_SETTINGS,
  QUIZ,
} from '../../App';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FilterListOffRoundedIcon from '@mui/icons-material/FilterListOffRounded';

export default function Header({
  profileSettings,
  userData,
  auth,
  filterVisible,
  onFilterIconClick,
}) {
  const [headerState, setHeaderState] = useState({
    anchorElUser: null,
    isLoginButtonVisible: false,
    isFilterIconEnabled: false,
    isUserMenuVisible: false,
    isLogoVisible: false,
  });

  const location = useLocation();
  const {
    anchorElUser,
    isLoginButtonVisible,
    isUserMenuVisible,
    isLogoVisible,
    isFilterIconEnabled,
  } = headerState;

  useEffect(() => {
    setHeaderState((prevState) => ({
      ...prevState,
      isLoginButtonVisible: location.pathname === HOME,
      isFilterIconEnabled:
        location.pathname === QUIZZES || location.pathname === FAVORITES,
      isLogoVisible: [
        QUIZZES,
        QUIZ,
        FAVORITES,
        NOTES,
        USER_SETTINGS,
        LOGIN,
        SIGNUP,
        RESET_PASSWORD,
        ERROR,
        ABOUT,
        LIBRARY,
      ].includes(location.pathname),
      isUserMenuVisible: [
        QUIZZES,
        QUIZ,
        FAVORITES,
        NOTES,
        USER_SETTINGS,
        LIBRARY,
      ].includes(location.pathname),
    }));
  }, [location.pathname]);

  // user menu
  const handleOpenUserMenu = (e) => {
    setHeaderState((prevState) => ({
      ...prevState,
      anchorElUser: e.currentTarget,
    }));
  };
  const handleCloseUserMenu = () => {
    setHeaderState((prevState) => ({ ...prevState, anchorElUser: null }));
  };

  // user icon
  const stringAvatar = (name) => {
    return {
      sx: {
        backgroundColor: 'primary.main',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  const isLogoOnRight = [LOGIN, SIGNUP, RESET_PASSWORD].includes(
    location.pathname
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: customColors.blackLight }}>
      <Container sx={{ maxWidth: '1200px' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {isLogoOnRight && <Box sx={{ flexGrow: 1 }} />}
          <Link to={HOME}>
            <Avatar
              src={jsQuizLogo}
              variant="square"
              sx={{
                width: '100px',
                height: '100%',
                flexGrow: 0,
                display: isLogoVisible ? 'flex' : 'none',
                justifyContent: isLogoOnRight ? 'end' : 'space-between',
                marginLeft: 'auto',
                [defaultTheme.breakpoints.up('md')]: isLogoOnRight && {
                  display: 'none',
                },
                [defaultTheme.breakpoints.down('sm')]: {
                  width: '85px',
                },
              }}
            />
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '350px',
              [defaultTheme.breakpoints.down('md')]: {
                ml: 0,
              },
            }}
          >
            <Search />
            {filterVisible ? (
              <FilterListRoundedIcon
                sx={{ display: isFilterIconEnabled ? 'flex' : 'none' }}
                onClick={onFilterIconClick}
              />
            ) : (
              <FilterListOffRoundedIcon
                sx={{ display: isFilterIconEnabled ? 'flex' : 'none' }}
                onClick={onFilterIconClick}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AboutElement />
            <Box
              sx={{ flexGrow: 0, display: isUserMenuVisible ? 'flex' : 'none' }}
            >
              <Tooltip title="Account info">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User avatar"
                    {...stringAvatar(
                      `${userData.firstName} ${userData.lastName}`
                    )}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '40px' }}
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
                <Typography
                  variant={'body1'}
                  sx={{
                    fontWeight: 'bold',
                    margin: '0 16px',
                    color: customColors.blackLight,
                  }}
                >{`${userData.firstName} ${userData.lastName}`}</Typography>
                <Typography
                  variant={'body2'}
                  sx={{
                    margin: '0 0 10px 16px',
                    color: customColors.greyDark,
                  }}
                >
                  {userData.email}
                </Typography>
                <Divider />
                {profileSettings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    component={Link}
                    to={setting.path}
                    onClick={handleCloseUserMenu}
                  >
                    {setting.icon}
                    <Typography
                      textAlign="center"
                      sx={{
                        ml: 1,
                        textTransform: 'uppercase',
                        fontSize: '14px',
                        color: customColors.greyMedium,
                      }}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {auth.loggedIn ? (
              <Button
                component={Link}
                to={QUIZZES}
                variant="outlined"
                sx={[
                  {
                    '&:hover': {
                      borderColor: customColors.white,
                      backgroundColor: '#3f3f3f',
                    },
                  },
                  {
                    borderColor: customColors.white,
                    color: customColors.white,
                    height: '30px',
                    display: isLoginButtonVisible ? 'flex' : 'none',
                  },
                ]}
              >
                QUIZZES
              </Button>
            ) : (
              <Button
                component={Link}
                to={LOGIN}
                variant="outlined"
                id="loginButton"
                sx={[
                  {
                    '&:hover': {
                      borderColor: customColors.white,
                      backgroundColor: '#3f3f3f',
                    },
                  },
                  {
                    borderColor: customColors.white,
                    color: customColors.white,
                    height: '30px',
                    display: isLoginButtonVisible ? 'flex' : 'none',
                  },
                ]}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
