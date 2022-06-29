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
      }}
      disableGutters
    >
      <Box
        sx={{
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
