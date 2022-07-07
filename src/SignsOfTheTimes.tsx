import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const SignsOfTheTimes = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      sx={{
        px: 14,
        py: 18,
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
      id="about"
      ref={ref}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: 5,
          }}
        >
          <img
            src="/brendan-2019-point-dune.png"
            alt="Brendan North staring into the distance with camera"
            style={{
              width: 'calc(100% + 14rem)',
              transform: 'translate(-14rem, 0)',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Box
          sx={{
            flex: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '8rem',
              lineHeight: '9rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 100,
              letterSpacing: '-0.05em',
              mb: 4,
            }}
          >
            About the Project
          </Typography>
          <Typography
            variant="body2"
            sx={{
            }}
          >
            “Signs of the Times” is a project by photographer Brendan North that comments
            on the current state of the NFT market and the state of world affairs at large.
            With the crash of cryptocurrencies across the board, the NFT community finds
            itself at the crossroads of bearish and bullish. This project will act as a definitive
            community vote of confidence in our future and in true NFT fashion, it will use art
            collection as the voting medium.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignsOfTheTimes;
