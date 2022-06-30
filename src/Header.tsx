import {
  Box, Link, Typography,
} from '@mui/material';
import React, { FC, useCallback } from 'react';
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
      {headerLinks.map(({ link, text }) => (
        <HeaderLink
          link={link}
          text={text}
          key={text}
        />
      ))}
      <ConnectButton />
    </Box>
  </Box>
);

export default Header;
