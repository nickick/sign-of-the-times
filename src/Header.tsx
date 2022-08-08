import {
  Box, Link, Typography,
} from '@mui/material';
import { Slant as Hamburger } from 'hamburger-react';
import React, {
  FC, useCallback, useContext, useState,
} from 'react';
import Notification from './Notification';
import ConnectButton from './ConnectButton';
import MobileDrawer from './Drawer';
import Gallery from './Gallery';
import { ContractContext } from './ContractContextProvider';

type Props = {
  link: string,
  text: string
}

const HeaderLink: FC<Props> = ({ link, text }) => {
  const onClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    document.getElementById(link)?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [link]);

  return (
    <Link
      href={`#${link}`}
      sx={{
        mr: 4,
      }}
      onClick={onClick}
    >
      <Typography
        variant="overline"
        color="secondary"
      >
        {text}
      </Typography>
    </Link>
  );
};

const headerLinks: Props[] = [
  {
    link: 'how-it-works',
    text: 'How it works',
  },
  {
    link: 'about',
    text: 'About',
  },
  {
    link: 'my-story',
    text: 'My Story',
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { galleryOpen, setGalleryOpen } = useContext(ContractContext);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  const openGallery = useCallback(() => {
    setGalleryOpen(true);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Gallery open={galleryOpen} onClose={closeGallery} />
      <Box
        sx={{
          position: {
            xs: 'block',
            md: 'absolute',
          },
          top: 0,
          left: 0,
          zIndex: 200,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mixBlendMode: 'difference',
          px: {
            xs: 3,
            md: 4,
          },
          mb: 4,
          pt: {
            xs: 9.5,
            md: 4,
          },
        }}
      >
        <MobileDrawer isOpen={isOpen} closeDrawer={closeDrawer} setOpen={setIsOpen} />
        <Typography
          variant="h1"
          color="secondary"
          sx={{
            mixBlendMode: 'difference',
            fontSize: {
              xs: '4.5rem',
              md: '4rem',
            },
            lineHeight: {
              xs: '4.5rem',
              md: '4rem',
            },
          }}
        >
          SIGNS ØF
          {' '}
          <br />
          THE TIMES
        </Typography>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {headerLinks.map(({ link, text }) => (
            <HeaderLink
              link={link}
              text={text}
              key={text}
            />
          ))}
          <Typography
            variant="overline"
            color="secondary"
            sx={{
              mr: 4,
              cursor: 'pointer',
            }}
            onClick={openGallery}
          >
            Gallery
          </Typography>
          <ConnectButton />
        </Box>
        <Box
          sx={{
            display: {
              xs: 'inherit',
              md: 'none',
              position: 'relative',
              zIndex: 2,
              bottom: '1.5rem',
            },
          }}
        >
          <Hamburger size={20} toggled={isOpen} toggle={setIsOpen} color="white" />
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            xs: 'inherit',
            md: 'none',
          },
          px: 3,
        }}
      >
        <ConnectButton sx={{
          width: '100%',
          mb: 4,
        }}
        />
      </Box>
      <Notification />
    </Box>
  );
};

export default Header;
