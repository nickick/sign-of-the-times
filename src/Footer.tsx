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
      p: {
        xs: 3,
        md: 6,
      },
      flexDirection: {
        xs: 'column',
        md: 'row',
      },
    }}
  >
    <Typography
      variant="body1"
      color="initial"
      sx={{
        fontsize: '1.5rem',
        lineHeight: '2rem',
        flex: 1,
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      &copy;2022 Brendan North
    </Typography>
    <Typography
      variant="h1"
      color="textBlack"
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: {
          xs: 'flex-start',
          md: 'space-around',
        },
        mb: {
          xs: 2,
          md: 0,
        },
        fontSize: {
          xs: '2rem',
          md: '1.5rem',
        },
        lineHeight: {
          xs: '2rem',
          md: '2rem',
        },
      }}
    >
      SIGN ØF THE TIMES
    </Typography>
    <Typography
      variant="body1"
      color="initial"
      sx={{
        flex: 1,
        display: {
          xs: 'block',
          md: 'none',
        },
        fontSize: {
          xs: '2rem',
          md: '1.5rem',
        },
        lineHeight: {
          xs: '2rem',
          md: '2rem',
        },
        mb: {
          xs: 2,
          md: 0,
        },
      }}
    >
      &copy;2022 Brendan North
    </Typography>
    <Typography
      variant="body1"
      color="initial"
      sx={{
        fontsize: '1.5rem',
        lineHeight: '2rem',
        display: 'flex',
        justifyContent: {
          xs: 'flex-start',
          md: 'flex-end',
        },
        flex: 1,
      }}
    >
      Privacy Policy
    </Typography>
  </Box>
);

export default Footer;
