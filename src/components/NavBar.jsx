import React, { useRef, useState } from 'react';
import {
  Link,
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Button,
  Modal,
  Backdrop,
  Typography,
} from '@mui/material';
import { LOGIN, SIGNUP } from 'App';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NavBar(props) {
  const { isLoading, userData, onLogout, setUserData } = props;
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ref = useRef(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const successful = await onLogout();
      console.log(successful);
      setUserData({
        firstName: '',
        lastName: '',
      });
      handleOpen();
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderAuthButtons = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (userData.firstName) {
      return (
        <Grid item>
          <Button onClick={() => handleLogout()} variant="outlined">
            Logout
          </Button>
        </Grid>
      );
    }
    return (
      <>
        <Grid item>
          <Button onClick={() => navigate(LOGIN)} variant="outlined">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => navigate(SIGNUP)} variant="outlined">
            Sign up
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper
          sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {/* The link to the login page has been added for testing purposes and will be replaced as soon as the main page is ready. */}
            <BottomNavigationAction
              component={Link}
              to={LOGIN}
              label="Quizzes"
              icon={<SchoolIcon />}
            />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Notes" icon={<SpeakerNotesIcon />} />
            <BottomNavigationAction
              label="Help Center"
              icon={<HelpRoundedIcon />}
            />
          </BottomNavigation>
        </Paper>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {renderAuthButtons()}
        </Grid>
      </Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              You have successfully Logged Out
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
