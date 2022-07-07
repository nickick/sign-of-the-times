import { Box, Container } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

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
        overflow: 'hidden',
      }}
      disableGutters
    >
      <Header />
      {children}
      <Footer />
    </Container>
  </Box>
);

export default Layout;
