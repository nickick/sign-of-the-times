import { Box, Link, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const SignsOfTheTimes = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      sx={{
        px: {
          md: 14,
        },
        py: {
          md: 18,
        },
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
      id="about"
      ref={ref}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          sx={[
            {
              flex: 5,
            },
            {
              '& > img': {
                width: {
                  xs: '100%',
                  md: 'calc(100% + 14rem)',
                },
                transform: {
                  xs: 'none',
                  md: 'translate(-14rem, 0)',
                },
              },
            },
          ]}
        >
          <img
            src="/the-signs-of-the-times.jpeg"
            alt="Brendan North staring into the distance with camera"
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
            py: {
              xs: 12,
              md: 0,
            },
            px: {
              xs: 3,
              md: 0,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '6rem',
                md: '8rem',
              },
              lineHeight: {
                xs: '6rem',
                md: '9rem',
              },
              fontFamily: 'Inter, sans-serif',
              fontWeight: {
                xs: 300,
                md: 100,
              },
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
            With cryptocurrencies down across the board, the NFT community finds
            itself at the crossroads of bearish and bullish. This project will act as a definitive
            community vote of confidence in our future and in true NFT fashion, it will use art
            collection as the voting medium.
            <br />
            <br />
            This isn&rsquo;t a concept that feeds you a one sided answer,
            instead it offers you a choice. Collecting your side allows you to
            cast a permanent vote on the blockchain reflecting
            your vision for the future during the bear market of 2022. Will you
            welcome the end with open arms, a last hurrah for the NFT world
            as we know it? Or will you choose to believe that we&rsquo;ve only just begun?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 6,
            }}
          >
            <Link
              href="https://superrare.com/brendannorth"
              target="_blank"
              sx={{
                textDecoration: 'none',
              }}
            >
              View more works
              <img src="arrow.svg" alt="view more works" style={{ marginLeft: '2rem' }} />
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignsOfTheTimes;
