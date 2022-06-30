import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      top: 0,
      left: 0,
      zIndex: 2,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      p: 6,
    }}
  >
    <Typography
      variant="body1"
      color="initial"
      sx={{
        fontsize: '1.5rem',
        lineHeight: '2rem',
      }}
    >
      &copy;2022 Brendan North
    </Typography>
    <Typography
      variant="h1"
      color="textBlack"
    >
      BRENDAN NØRTH
    </Typography>
    <Typography
      variant="body1"
      color="initial"
      sx={{
        fontsize: '1.5rem',
        lineHeight: '2rem',
      }}
    >
      Privacy Policy
    </Typography>
  </Box>
);

export default Footer;
