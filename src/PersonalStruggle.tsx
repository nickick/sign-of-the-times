import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const PersonalStruggle = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      sx={{
        pt: 24,
        pl: 14,
        display: 'flex',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
      ref={ref}
    >
      <Box
        sx={{
          flex: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: '3.75rem',
          }}
        >
          Stories of long covid recovery are few and far between with many
          suffering for more than 2 years now. At some points I felt so sick, I
          thought that was going to be me. Forever trapped inside my own body
          with barely enough energy to get out of bed. The end has never felt so
          near.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      />

      <Box
        sx={{
          flex: 8,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            pr: 14,
          }}
        >
          I created this image as a commentary on the state of the NFT market as
          a conversation to entertain the community in a time of fear and
          uncertainty. But I would be remissed if I didn&rsquo;t acknowledge its
          relevance to the state of our world at large. The world is facing
          generation defining challenges. The economic, social, and environmental
          implications of our time are dire. Our future, yet to be told. And even
          personally, these conflicting messages have embedded themselves in my
          thoughts. I have felt the debate between the beginning and the end rage
          inside me as I battled with my health.
        </Typography>
        <Box
          sx={{
            width: 'calc(100%+14rem)',
            py: 8,
          }}
        >
          <img
            src="/end-is-near.png"
            alt="Man holding End is Near sign"
            style={{
              width: '100%',
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            pr: 14,
          }}
        >
          At the beginning of 2022, my life got put on hold. I had developed a wide
          array of scary and debilitating symptoms after a covid infection. It has
          taken me 6 months to feel well enough to start shooting again. During
          this recovery journey I learned a lot about myself and how I want to live
          my life. Going through something like this I would be a fool not to learn
          from it. But what&rsquo;s funny is that I came to realize that all I
          wanted to do was be more myself and double down on the things I
          was already chasing. When you&rsquo;re sick you start to think about what
          you&rsquo;ve accomplished in life so far and what you&rsquo;ll be
          remembered for. It&rsquo;s terrifying to look upon your achievements and
          feel unsatisfied. For me, this thought became a driving force in my
          recovery. I would do everything in my power to get my body and mind back
          from this awful illness.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            pr: 14,
            mb: 38,
          }}
        >
          But the few stories I did see, I took to heart. If recovery was
          possible, I would do it. I saw over 20 different specialists, spent
          thousands on supplements, and tried numerous treatments including some
          that are considered largely experimental. But I would not give up. I
          would create again. I have a lot to say and I would not live my life
          with my art locked inside me. And with time, I have recovered. Today I
          would say I am 90% back to my normal self. The beginning is near.
        </Typography>
      </Box>

    </Box>
  );
};

export default PersonalStruggle;
