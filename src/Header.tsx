import {
  Box, Typography, Button, Link,
} from '@mui/material';

const Header = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      p: 4,
    }}
  >
    <Typography
      variant="h1"
      color="primary"
    >
      BRENDAN
      {' '}
      <br />
      NØRTH
    </Typography>
    <Box>
      <Link
        href="#how-it-works"
        sx={{
          mr: 4,
        }}
      >
        <Typography
          variant="overline"
          color="secondary"
        >
          How it works
        </Typography>
      </Link>
      <Link
        href="#about"
        sx={{
          mr: 4,
        }}
      >
        <Typography
          variant="overline"
          color="secondary"
        >
          About
        </Typography>
      </Link>
      <Button
        variant="contained"
        color="primary"
        sx={{
          p: 2
        }}
      >
        <Typography
          variant="overline"
          color="secondary"
        >
          Connect Wallet
        </Typography>
      </Button>
    </Box>
  </Box>
);

export default Header;
