import {
  Box, Drawer,
} from '@mui/material';
import { Slant as Hamburger } from 'hamburger-react';
import React from 'react';
import NavLink from './Navlink';
import { sectionNav, shortSocialLinks } from './social-links';

type MobileDrawerProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeDrawer: () => void;
};

const MobileDrawer = ({ isOpen, setOpen, closeDrawer }: MobileDrawerProps) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={closeDrawer}
    PaperProps={{
      sx: {
        p: 4,
        width: '100vw',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        right: '4rem',
        top: '10rem',
      }}
    >
      <Hamburger toggled={isOpen} toggle={setOpen} direction="left" size={20} />
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {sectionNav.map(({ text, href, icon }, index) => (
        <NavLink
          key={text + href}
          text={text}
          href={href}
          icon={icon}
          index={index}
          anchor={text.toLowerCase()}
          onClose={closeDrawer}
        />
      ))}
      {shortSocialLinks.map(({ text, href, icon }, index) => (
        <NavLink
          key={text + href}
          text={text}
          href={href}
          icon={icon}
          index={index + sectionNav.length}
          anchor={text.toLowerCase()}
          onClose={closeDrawer}
        />
      ))}
    </Box>
  </Drawer>
);

export default MobileDrawer;
