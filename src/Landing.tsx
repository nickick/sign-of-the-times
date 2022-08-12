import { Box } from '@mui/material';
import React, { useContext } from 'react';
import AboutTheProject from './AboutTheProject';
import { ContractContext, ContractStatus } from './ContractContextProvider';
import HowItWorks from './HowItWorks';
import ImageZoom from './ImageZoom';
import MeteoricRise from './MeteoricRise';
import PersonalStruggle from './PersonalStruggle';

const Landing: React.FC = () => {
  const { beginningCount, endCount, contractStatus } = useContext(ContractContext);

  const isOver = contractStatus === ContractStatus.Paused
    && (endCount > 0 || beginningCount > 0);

  return (
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
              md: `${(endCount || 1) / ((endCount || 1) + (beginningCount || 1))}`,
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
          count={beginningCount}
        />
        <ImageZoom
          imgSrc="/the-end-is-near.jpg"
          imgAlt="Masked man holding a sign The Beginning is Near"
          colorType="dark"
          count={endCount}
        />
        {/* <SignsMinter open={mintOpen} onClose={closeMint} /> */}
      </Box>
      {
        isOver && (
          <Box
            sx={{
              py: {
                xs: 4,
                md: 0,
              },
              bgcolor: '#141414',
            }}
          />
        )
      }
      <HowItWorks />
      <AboutTheProject />
      <MeteoricRise />
      <PersonalStruggle />
    </Box>
  );
};

export default Landing;
