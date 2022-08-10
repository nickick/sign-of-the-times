import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import AboutTheProject from './AboutTheProject';
import { ContractContext, ContractStatus } from './ContractContextProvider';
import HowItWorks from './HowItWorks';
import ImageZoom from './ImageZoom';
import MeteoricRise from './MeteoricRise';
import PersonalStruggle from './PersonalStruggle';
import SignsMinter from './SignsMinter';

const Landing: React.FC = () => {
  const { beginningCount, endCount, contractStatus } = useContext(ContractContext);

  const isOver = contractStatus === ContractStatus.Paused
    && (endCount > 0 || beginningCount > 0);

  const [mintOpen, setMintIsOpen] = useState(false);

  const closeMint = useCallback(() => {
    setMintIsOpen(false);
  }, []);

  const openMint = useCallback(() => {
    setMintIsOpen(true);
  }, []);

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
        {
          isOver && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: '40rem',
                position: 'absolute',
                bottom: {
                  xs: '-10rem',
                  md: 0,
                },
                right: '50%',
                transform: 'translate(50%, 50%)',
                bgcolor: 'black',
                zIndex: 1000,
              }}
              size="large"
              onClick={openMint}
            >
              <Typography
                variant="body2"
                color="secondary"
                sx={{
                  fontSize: '2rem',
                  lineHeight: '3.0rem',
                }}
              >
                Mint &quot;The Signs of the Times&quot;
              </Typography>
            </Button>
          )
        }
        <SignsMinter open={mintOpen} onClose={closeMint} />
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
