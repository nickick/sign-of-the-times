import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

const Logo: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mb: 1.5,
    }}
  >
    <Typography
      variant="h1"
      color="initial"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12.17rem',
      }}
    >
      chaos
      <span style={{
        fontFamily: 'Lato, sans-serif',
        fontWeight: 300,
        marginLeft: '0.4rem',
        fontSize: '4.82rem',
      }}
      >
        &amp;
      </span>
    </Typography>
    <Typography
      variant="h2"
      color="initial"
      sx={{
        fontFamily: 'Monica AllCaps, serfif',
        fontSize: '7.4rem',
        lineHeight: '0rem',
      }}
    >
      couture
    </Typography>
  </Box>
);

export default Logo;
