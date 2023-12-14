import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Labels from '../components/Labels';
import Progress from '../components/Progress';
import customColors from '../assets/styles';
import { QUIZ } from 'App';

const Quiz = ({ quiz, activeFilters, quizProgress }) => {
  const isFilterActive = (filterType, value) =>
    activeFilters[filterType].length > 0 &&
    activeFilters[filterType].includes(value);
  const progress = quizProgress;
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Grid item key={quiz.id} xs={12} sm={6} md={4}>
      <Link to={`${QUIZ}/${quiz.id}`} style={{ textDecoration: 'none' }}>
        <Card
          elevation={1}
          sx={{
            height: '100%',
            display: 'flex',
            padding: '20px 30px',
            minWidth: '270px',
            transition: 'transform 0.2s',
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
                      backgroundColor: isFilterActive(
                        'categories',
                        quiz.category
                      )
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
                  <Progress progress={progress.bestScore} />
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
            </CardContent>
          </Grid>
        </Card>
      </Link>
    </Grid>
  );
};

export default Quiz;
