import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Labels from '../components/Labels';
import Progress from '../components/Progress';
import customColors from '../assets/styles';
import { QUIZ } from 'App';

const Quiz = ({ quiz, activeFilters, getProgressForQuiz }) => {
  const isFilterActive = (filterType, value) =>
    activeFilters[filterType].length > 0 &&
    activeFilters[filterType].includes(value);
  const progress = getProgressForQuiz(quiz.id);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardClickable, setCardClickable] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCardClickable(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCardClickable(true);
  };

  const handleAddToFavorites = () => {
    console.log('Quiz was added to favorites!');
    handleClose();
  };
  const handleResetProgress = () => {
    console.log('Quiz progress was reset!');
    handleClose();
  };

  return (
    <Grid item key={quiz.id} xs={12} sm={6} md={4}>
      <Card
        elevation={1}
        onClick={(event) => {
          // Only navigate when clicking on the non-interactive parts of the card
          if (!event.target.closest('.menu-icon') && cardClickable) {
            window.location.href = `${QUIZ}/${quiz.id}`;
          }
        }}
        sx={{
          height: '100%',
          display: 'flex',
          padding: '20px 30px',
          minWidth: '270px',
          position: 'relative',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: customColors.hover,
          },
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <CardContent
            sx={{
              display: 'flex',
              padding: '0 !important',
              justifyContent: 'space-between',
              '& > div': {
                flex: '1 1 0',
              },
              height: '100%',
              width: '100%',
            }}
          >
            {/* this is the content of the left side inside each card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '9px',
                  marginRight: '10px',
                }}
              >
                <Labels
                  labels={quiz.labels}
                  isFilterActive={isFilterActive}
                ></Labels>
                <Chip
                  sx={{
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: isFilterActive('levels', quiz.level)
                      ? customColors.blueMedium
                      : customColors.grey,
                    color: isFilterActive('levels', quiz.level)
                      ? customColors.grey
                      : customColors.blueMedium,
                  }}
                  size={isSmallScreen ? 'medium' : 'small'}
                  label={quiz.level}
                />
                <Chip
                  sx={{
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: isFilterActive('categories', quiz.category)
                      ? customColors.blueMedium
                      : customColors.grey,
                    color: isFilterActive('categories', quiz.category)
                      ? customColors.grey
                      : customColors.blueMedium,
                  }}
                  size={isSmallScreen ? 'medium' : 'small'}
                  label={quiz.category}
                />
              </Box>
              <Box>
                <Typography
                  sx={{ marginTop: '10px', color: customColors.greyMedium }}
                >
                  {progress.attemptsCount
                    ? `Attempts: ${progress.attemptsCount}`
                    : 'Not Passed'}
                </Typography>
              </Box>
            </Box>

            {/* this is the content of the right side inside each card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box
                marginTop="25px"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  width="100%"
                  component="div"
                  sx={{
                    width: '63px',
                    height: '62px',
                  }}
                  image={quiz.image}
                />
                <Progress progress={progress.progress} />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant={'h6'}
                  component="h2"
                  marginTop="40px"
                  fontWeight="bold"
                  lineHeight="22px"
                >
                  {quiz.title}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: 'absolute', right: 3, top: 3 }}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="menu-icon"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToFavorites();
                    handleClose();
                  }}
                >
                  Add to Favorites
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleResetProgress();
                    handleClose();
                  }}
                >
                  Reset progress
                </MenuItem>
              </Menu>
            </Box>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Quiz;
