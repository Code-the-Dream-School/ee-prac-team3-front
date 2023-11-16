import {Avatar, Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import customColors, {defaultTheme} from "../../assets/styles";
import React from "react";

const Team = ({team}) => {
    return (
        <>
            {team.map((member, index) => (
                <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    p: 1
                }}>
                    <Avatar
                        target='_blank'
                        component={Link}
                        to={member.gitHub}
                        alt={member.name}
                        src={member.imageURL}
                        sx={{
                            width: 100, height: 100, mb: 1,
                            [defaultTheme.breakpoints.down('sm')]: {
                                width: 80,
                                height: 80,
                            }
                        }}
                    />
                    <Typography variant={'body1'}
                                target='_blank'
                                component={Link}
                                to={member.gitHub}
                                sx={{
                                    textDecoration: 'none',
                                    color: customColors.blackMedium,
                                    fontWeight: 'bold'
                                }}>{member.name}</Typography>
                    <Typography sx={{
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        color: customColors.greyMedium,
                    }}>{member.role}</Typography>
                </Box>
            ))}
        </>
    )
};

export default Team;