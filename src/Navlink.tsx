/* eslint-disable react/require-default-props */
import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { entranceAnimationDuration, fadeIn } from './utils/animations';

type NavLinkProps = {
  text?: string;
  href?: string;
  icon?: React.ReactNode;
  anchor?: string;
  index: number;
  onClose: () => void;
};

function NavLink({
  text = '',
  href = '',
  icon = null,
  anchor = '',
  index,
  onClose,
}: NavLinkProps) {
  const scrollTo = useCallback(() => {
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({
        behavior: 'smooth',
      });
    }

    onClose();
  }, [anchor, onClose]);

  return (
    <Link
      href={href}
      passHref
      target={(icon || href[0] !== '/') ? '_blank' : ''}
    >
      <Button
        variant="text"
        sx={{
          color: 'text.primary',
          minWidth: icon ? '1rem' : 'inherit',
          my: '0.5rem',
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${index * 0.1}s`,
        }}
        onClick={scrollTo}
      >
        {text}
        {icon || ''}
      </Button>
    </Link>
  );
}

export default NavLink;
