import { Box, Typography } from '@mui/material';

const MeteoricRise = () => (
  <Box
    sx={{
      pl: 14,
    }}
  >
    <Box
      sx={{
        background: '#141414',
        pr: 14,
        py: 12,
        display: 'flex',
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
        }}
      >
        The meteoric rise of NFTs has changed the digital landscape and the art world forever.
        In 2021, they captivated the attention of mass media and millions of people around the
        world.From revolutionizing digital ownership to redefining what it means to be a
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
        <br />
        <br />
        &rdquo;
        <span
          style={{
            fontWeight: 700,
          }}
        >
          Signs of the Times
        </span>
        &rdquo; isn&rsquo;t a concept that feeds you a
        one sided answer, instead it offers you a choice. Collecting your side
        allows you to cast a permanent vote on the blockchain reflecting
        your vision for the future during the crash of 2022. Will you welcome
        the end with open arms, a last hurrah for the NFT world as we know it?
        Or will you choose to believe that we&rsquo;ve only just begun?
      </Typography>
    </Box>
  </Box>
);

export default MeteoricRise;
