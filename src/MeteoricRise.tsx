import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const MeteoricRise = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      sx={{
        pl: {
          md: 14,
        },
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
      ref={ref}
    >
      <Box
        sx={{
          background: '#141414',
          pl: {
            xs: 3,
            md: 0,
          },
          pr: {
            xs: 3,
            md: 14,
          },
          py: 12,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            flex: 5,
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: '3.75rem',
            mb: {
              xs: 8,
              md: 0,
            },
          }}
        >
          The meteoric rise of NFTs has changed the digital landscape and the art world forever.
          In 2021, they captivated the attention of mass media and millions of people around the
          world. From revolutionizing digital ownership to redefining what it means to be a
          modern artist, the impact of NFTs is undeniable. And yet they are not impervious
          to external markets and economic implications.
        </Typography>
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            flex: 5,
          }}
        >
          NFTs have been declared dead almost as many times as cryptocurrency
          itself. And today, the community that built this revolution finds
          itself in a dramatic downturn. The outlook of the current climate
          is a topic of contention. Some may look upon the state of the NFT space
          and declare that the end is near. But others may view this time
          as an opportunity, a chance at a new beginning.
        </Typography>
      </Box>
    </Box>
  );
};

export default MeteoricRise;
