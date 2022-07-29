import { Box } from '@mui/material';
import React from 'react';
import AboutTheProject from './AboutTheProject';
import HowItWorks from './HowItWorks';
import ImageZoom from './ImageZoom';
import MeteoricRise from './MeteoricRise';
import PersonalStruggle from './PersonalStruggle';

// const [beginningMint, setBeginningMint] = useState(0);
// const [endMint, setEndMint] = useState(0);
const Landing: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      // overflow: 'hidden',
      background: 'white',
      width: '100%',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        background: {
          xs: '#ffffff',
          md: '#efefef',
        },
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: `${(0 || 1) / ((0 || 1) + (0 || 1))}`,
          },
          height: {
            xs: '55%',
            md: '100%',
          },
          position: 'absolute',
          bgcolor: '#151515',
          right: 0,
          bottom: 0,
          transition: 'width 0.5s ease-in-out',
        }}
      />
      <ImageZoom
        imgSrc="/the-beginning-is-near.jpg"
        imgAlt="Masked man holding a sign The Beginning is Near"
        colorType="light"
        count={0}
      />
      <ImageZoom
        imgSrc="/the-end-is-near.jpg"
        imgAlt="Masked man holding a sign The Beginning is Near"
        colorType="dark"
        count={0}
      />
    </Box>
    <HowItWorks />
    <AboutTheProject />
    <MeteoricRise />
    <PersonalStruggle />
  </Box>
);
export default Landing;
