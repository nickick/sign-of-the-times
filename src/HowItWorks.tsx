import { Box, Typography } from '@mui/material';
import React from 'react';

const HowItWorks = () => (
  <Box
    sx={{
      px: 14,
      pt: 18,
    }}
    id="how-it-works"
  >
    <Box
      sx={{
        py: 12,
        bgcolor: '#141414',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      />
      <Typography
        variant="h2"
        color="secondary"
        sx={{
          fontWeight: 300,
          fontSize: '6rem',
          lineHeight: '6rem',
          flex: 2,
        }}
      >
        How it works
      </Typography>
      <Box
        sx={{
          flex: 1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 7,
        }}
      >
        <Typography
          variant="body1"
          color="secondary"
          sx={{
            fontSize: '2rem',
            lineHeight: '3rem',
          }}
        >
          The mint will last 24 hours.
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{
            my: 2,
          }}
        >
          You may mint as many “votes” as you like. Voting for both images is allowed.
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{
          }}
        >
          Shortly after the open edition vote has closed, a burn mechanic will be in effect
          allowing collectors to burn 3 OE&rsquo;s for a 3rd master image that will bear
          this project&rsquo;s name.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      />
    </Box>
  </Box>
);

export default HowItWorks;
