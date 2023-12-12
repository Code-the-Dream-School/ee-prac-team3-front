import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import customColors from "../assets/styles";

export default function Error() {
  return (
    <Container
      sx={{
          minHeight: '85vh',
          backgroundColor: customColors.backgroundLight,
          maxWidth: 'none !important',
          pt: 6,
          pb: 2,
      }}
    >
      <Box>
        <Typography variant={'h3'}>Error 404 :(</Typography>
      </Box>
    </Container>
  );
}
