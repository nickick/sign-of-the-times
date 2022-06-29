import { Box, Container, Typography } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <Box
    sx={{
      bgcolor: '#000',
    }}
  >
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: 'white',
        position: 'relative',
      }}
      disableGutters
    >
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
          color="initial"
        >
          BRENDAN
          {' '}
          <br />
          NØRTH
        </Typography>
      </Box>
      {children}
    </Container>
  </Box>
);

export default Layout;
