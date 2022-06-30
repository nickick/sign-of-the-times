import { Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      width: '100%',
      display: 'flex',
      p: 4,
    }}
  >
    <Typography
      variant="h1"
      color="textBlack"
    >
      BRENDAN
      {' '}
      <br />
      NØRTH
    </Typography>
  </Box>
);

export default Header;
