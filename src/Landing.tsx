import { Box } from '@mui/material';
import React from 'react';
import HowItWorks from './HowItWorks';
import ImageZoom from './ImageZoom';
import MeteoricRise from './MeteoricRise';
import SignsOfTheTimes from './SignsOfTheTimes';

const Landing: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'white',
      width: '100%',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <ImageZoom
        imgSrc="/the-beginning-is-near.jpg"
        imgAlt="Masked man holding a sign The Beginning is Near"
        colorType="light"
      />
      <ImageZoom
        imgSrc="/the-end-is-near.jpg"
        imgAlt="Masked man holding a sign The Beginning is Near"
        colorType="dark"
      />
    </Box>
    <HowItWorks />
    <SignsOfTheTimes />
    <MeteoricRise />
  </Box>
);

export default Landing;
