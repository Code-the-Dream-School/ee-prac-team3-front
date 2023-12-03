import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import customColors, { defaultTheme } from '../../assets/styles';
import React from 'react';

const Team = ({ team }) => {
  return (
      <>
        {team.map((member) => (
            <Grid
                item
                key={member.id}
                xs={12}
                sm={12}
                md={5}
                container
                sx={{
                  gap: 2,
                }}
            >
              <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 4,
                    alignItems: 'center',
                    p: 3,
                    [defaultTheme.breakpoints.down('sm')]: {
                      p: 1,
                      pb: 3,
                    },
                  }}
              >
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 1,
                    }}
                >
                  <Avatar
                      target="_blank"
                      component={Link}
                      to={member.gitHub}
                      alt={member.name}
                      src={member.imageURL}
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 1,
                        [defaultTheme.breakpoints.down('sm')]: {
                          width: 90,
                          height: 90,
                        },
                      }}
                  />
                  <Typography
                      variant={'body1'}
                      target="_blank"
                      component={Link}
                      to={member.gitHub}
                      sx={{
                        textDecoration: 'none',
                        color: customColors.blackMedium,
                        fontWeight: 'bold',
                      }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                      sx={{
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        color: customColors.greyMedium,
                      }}
                  >
                    {member.role}
                  </Typography>
                </Box>
                <Typography
                    variant={'body1'}
                    sx={{ margin: '0 20px', textAlign: 'justify', textIndent: '2em' }}
                >
                  {member.description}
                </Typography>
              </Paper>
            </Grid>
        ))}
      </>
  );
};

export default Team;