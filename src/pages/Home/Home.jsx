import React from 'react';
import {Box, Button, Paper, Typography} from '@mui/material';
import jsQuizLogo from '../../assets/images/logo.svg';
import s from './Home.module.css'
import c from '../../App.module.css'
import customColors, {defaultTheme} from '../../assets/styles';
import {LOGIN} from "../../App";
import {Link} from "react-router-dom";
import ContactForm from "./ContactForm";
import HighlightsSection from "./Highlights";
import Team from "./Team";

export default function Home({team, highlights, snackbar}) {
    return (
        <>
            {/*Home section*/}
            <Box className={s.homeBackground}>
                <img
                    alt='JSQuiz logo'
                    className={s.logoImage}
                    src={jsQuizLogo}
                />
                <Button
                    component={Link}
                    to={LOGIN}
                    size={'large'}
                    variant="outlined"
                    sx={[{
                        '&:hover': {
                            backgroundColor: '#3f3f3f',
                            border: `3px solid ${customColors.greyLight}`,
                            fontWeight: 'bold'
                        }
                    },
                        {
                            mt: 3,
                            mb: 2,
                            color: customColors.greyLight,
                            border: `3px solid ${customColors.greyLight}`,
                            width: '200px',
                            fontWeight: 'bold'
                        },
                    ]}
                >
                    Start here
                </Button>
            </Box>
            {/*Highlights section*/}
            <Box sx={{
                backgroundColor: customColors.greyLight,
                padding: '50px 0',
                [defaultTheme.breakpoints.down('sm')]: {
                    paddingBottom: '10px',
                },
            }}>
                <Paper className={c.container} elevation={3} sx={{
                    [defaultTheme.breakpoints.down('sm')]: {
                        marginTop: '-135px',
                    },
                    marginTop: '-155px',
                    position: 'relative'
                }}>
                    <HighlightsSection highlights={highlights}/>
                </Paper>
            </Box>
            {/*Welcome section*/}
            <Box sx={{
                backgroundColor: customColors.greyLight,
                padding: '50px 0',
                textAlign: 'center'
            }}>
                <Box className={c.container}>
                    <Typography variant={'h4'} sx={{
                        fontWeight: 'bold',
                        fontSize: '28px',
                        [defaultTheme.breakpoints.down('sm')]: {
                            fontSize: '24px'
                        }
                    }}>Welcome to our educational platform!</Typography>
                </Box>
            </Box>
            {/*Quizzes section*/}
            <Box sx={{
                backgroundColor: customColors.backgroundLight,
            }}>
                <Box className={c.container}>
                    <Box className={s.quizContainer}>
                        <Box sx={{
                            width: '70%', mt: 8, mb: 8,
                            [defaultTheme.breakpoints.down('md')]: {
                                width: '100%',
                                mt: 6,
                                mb: 5
                            }
                        }}>
                            <Typography variant={'h6'} sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                mb: 3,
                                [defaultTheme.breakpoints.down('sm')]: {
                                    textAlign: 'justify',
                                    fontSize: '18px'
                                }
                            }}>Test your knowledge with our quizzes</Typography>
                            <Box>
                                <Box>
                                    <Typography variant={'body1'} sx={{
                                        textAlign: 'justify',
                                        [defaultTheme.breakpoints.down('sm')]: {
                                            fontSize: '14px'
                                        },
                                    }}>Whether you're a novice
                                        or an
                                        experienced developer, our interactive quizzes will challenge and expand
                                        your
                                        knowledge. </Typography>
                                    <Typography variant={'body1'} sx={{
                                        textAlign: 'justify',
                                        [defaultTheme.breakpoints.down('sm')]: {
                                            fontSize: '14px'
                                        },
                                    }}>Sharpen your coding skills,
                                        solidify
                                        your understanding, and embark on a learning journey that's both fun and
                                        educational. </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 3, mb: 2,
                                        }}
                                    >
                                        Take a quiz
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={s.quizSectionImage} sx={{
                            marginLeft: '50px',
                            [defaultTheme.breakpoints.down('md')]: {
                                display: 'none'
                            }
                        }}>
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box className={s.quizSectionImage} sx={{
                height: '150px',
                [defaultTheme.breakpoints.up('md')]: {
                    display: 'none'
                }
            }}>
            </Box>
            {/*Quote section*/}
            <Box sx={{
                backgroundColor: customColors.greyLight,
                padding: '100px 0',
                [defaultTheme.breakpoints.down('sm')]: {
                    padding: '50px 0',
                }
            }}>
                <Box className={c.container} sx={{flexDirection: 'column',}}>
                    <Typography variant={'h6'} textAlign='center'
                    >“The only way to do great work is to love what you do.”</Typography>
                    <Box>
                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                color: customColors.greyMedium,
                                [defaultTheme.breakpoints.down('sm')]: {
                                    fontSize: '12px'
                                }
                            }}>Steve
                            Jobs</Typography>
                    </Box>
                </Box>
            </Box>
            {/*Notes section*/}
            <Box sx={{
                backgroundColor: customColors.backgroundLight,
            }}>
                <Box className={c.container}>
                    <Box className={s.quizContainer}>
                        <Box className={s.quizSectionImage} sx={{
                            marginRight: '50px',
                            [defaultTheme.breakpoints.down('md')]: {
                                display: 'none'
                            }
                        }}>
                        </Box>
                        <Box sx={{
                            width: '70%', mt: 8, mb: 8,
                            [defaultTheme.breakpoints.down('md')]: {
                                width: '100%',
                                mt: 6,
                                mb: 5
                            }
                        }}>
                            <Typography variant={'h6'} sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                mb: 3,
                                [defaultTheme.breakpoints.down('sm')]: {
                                    textAlign: 'justify',
                                    fontSize: '18px'
                                }
                            }}>Take notes for online courses and generate diagrams with Assistant</Typography>
                            <Box>
                                <Box>
                                    <Typography variant={'body1'} sx={{
                                        textAlign: 'justify',
                                        [defaultTheme.breakpoints.down('sm')]: {
                                            fontSize: '14px'
                                        },
                                    }}>The educational platform offer programmers an easy and effective way to take
                                        notes for online courses with the help of AI assistant for
                                        free.</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 3, mb: 2,
                                        }}
                                    >
                                        Explore notes
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box className={s.quizSectionImage} sx={{
                height: '150px',
                [defaultTheme.breakpoints.up('md')]: {
                    display: 'none'
                }
            }}>
            </Box>
            {/*Team section*/}
            <Box sx={{
                backgroundColor: customColors.greyLight,
                padding: '100px 100px',
                textAlign: 'center',
                [defaultTheme.breakpoints.down('sm')]: {
                    padding: '50px 0',
                }
            }}>
                <Box className={c.container}>
                    <Typography variant={'h4'} sx={{
                        mb: 3,
                        [defaultTheme.breakpoints.down('sm')]: {
                            fontSize: '28px'
                        }
                    }}
                    >Our team</Typography>
                    <Box>
                        <Typography variant={'body1'} sx={{
                            [defaultTheme.breakpoints.down('sm')]: {
                                fontSize: '14px'
                            },
                        }}>Our dynamic team consists of a group of junior developers who are
                            deeply passionate about coding. We're constantly working to enhance our skills and stay
                            up-to-date with the latest in the world of technology. With a shared commitment to
                            growth
                            and improvement, we are dedicated to delivering top-notch solutions.</Typography>
                    </Box>
                    <Team team={team}/>
                </Box>
            </Box>
            {/*CTD section*/}
            <Box sx={{
                backgroundColor: customColors.backgroundLight,
                paddingTop: '100px',
                paddingBottom: '30px',
                [defaultTheme.breakpoints.down('sm')]: {
                    paddingTop: '50px',
                },
            }}>
                <Paper className={c.container} elevation={3} sx={{
                    backgroundColor: customColors.blackLight,
                    position: 'relative'
                }}>
                    <Box sx={{
                        pl: 15, pt: 5, pb: 5, pr: 15,
                        [defaultTheme.breakpoints.down('md')]: {
                            p: 5
                        }
                    }}>
                        <Box>
                            <Typography variant={'h6'}
                                        sx={{
                                            color: 'white',
                                            textTransform: 'uppercase',
                                            textAlign: 'justify',
                                            mb: 2,
                                            [defaultTheme.breakpoints.down('sm')]: {
                                                fontSize: '18px'
                                            }
                                        }}>
                                <span style={{color: customColors.blueMedium}}>JS</span>
                                Quiz platform is made possible with the support of
                                <span style={{color: customColors.orangeDark}}> Code The Dream </span>
                                institution.</Typography>
                        </Box>
                        <Typography varian={'body2'} sx={{
                            color: customColors.white,
                            textAlign: 'justify',
                            [defaultTheme.breakpoints.down('sm')]: {
                                fontSize: '14px'
                            }
                        }}>
                            Code the Dream offers free intensive training in software development. The
                            ultimate aim of Code the Dream is to create a unique win-win, where coders gain real
                            experience building apps that make the world a little better place, and then use that
                            experience to launch new careers with enormous opportunity for themselves, their
                            families, and their communities.
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            target='_blank'
                            to={'https://codethedream.org/'}
                            sx={{
                                mt: 3, mb: 2,
                            }}
                        >
                            Learn more
                        </Button>
                    </Box>
                </Paper>
            </Box>
            {/*Donation section*/}
            <Box sx={{
                backgroundColor: customColors.backgroundLight,
                paddingBottom: '100px',
                textAlign: 'center',
                [defaultTheme.breakpoints.down('sm')]: {
                    paddingBottom: '50px',
                },
            }}>
                <Box className={c.container}>
                    <Typography variant={'body1'} sx={{
                        [defaultTheme.breakpoints.down('sm')]: {
                            fontSize: '14px'
                        }
                    }}>
                        Help make dreams a reality. Your donation can empower more projects like this, making a
                        positive
                        impact in the world of tech education. Join Code the dream in supporting the next generation
                        of
                        developers and innovators. Every contribution counts.
                    </Typography>
                    <Button
                        variant="outlined"
                        component={Link}
                        target='_blank'
                        size={'large'}
                        to={'https://codethedream.org/donate/'}
                        sx={[{
                            '&:hover': {
                                border: '3px dashed',
                                fontWeight: 'bold'
                            }
                        },
                            {
                                mt: 3, mb: 2,
                                border: '3px dashed'
                            }
                        ]}
                    >
                        Donate today
                    </Button>
                </Box>
            </Box>
            {/*Contact section*/}
            <Box sx={{
                backgroundColor: customColors.greyLight,
                padding: '100px 50px',
                [defaultTheme.breakpoints.down('sm')]: {
                    padding: '50px 0',
                }
            }}>
                <ContactForm snackbar={snackbar}/>
            </Box>
        </>
    );
};

