import {
  Box, Link, Typography,
} from '@mui/material';
import { Slant as Hamburger } from 'hamburger-react';
import React, { FC, useCallback, useState } from 'react';
import ConnectButton from './ConnectButton';

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
  }, []);

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
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
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
    </Box>
  );
};

export default Header;
