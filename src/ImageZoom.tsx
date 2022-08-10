import {
  Box, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import MintButton from './MintButton';

type Props = {
  imgSrc: string,
  imgAlt: string,
  colorType: 'light' | 'dark',
  count: number,
}

type AnimationSettings = {
  scale: number,
  y: number,
  duration: number,
  ease: string
}

const magnification: number = 1.7;

const zoomImageAnimation: AnimationSettings = {
  scale: magnification,
  y: -70,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const resetAnimation: AnimationSettings = {
  scale: 1.1,
  y: 0,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const ImageZoom: React.FC<Props> = ({
  imgSrc, imgAlt, colorType, count,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const onMouseEnter = () => {
      gsap.to(imageRef.current, zoomImageAnimation);
    };

    const onMouseLeave = () => {
      gsap.to(imageRef.current, resetAnimation);
    };

    let imageRefCurrent: HTMLImageElement;
    let buttonRefCurrent: HTMLButtonElement;

    if (imageRef.current && buttonRef.current && matchesMd) {
      imageRefCurrent = imageRef.current;
      buttonRefCurrent = buttonRef.current;
      imageRefCurrent.addEventListener('mouseenter', onMouseEnter);
      imageRefCurrent.addEventListener('mouseleave', onMouseLeave);
      buttonRefCurrent.addEventListener('mouseenter', onMouseEnter);
      buttonRefCurrent.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (imageRefCurrent && buttonRefCurrent && matchesMd) {
        imageRefCurrent.removeEventListener('mouseenter', onMouseEnter);
        imageRefCurrent.removeEventListener('mouseleave', onMouseLeave);
        buttonRefCurrent.removeEventListener('mouseenter', onMouseEnter);
        buttonRefCurrent.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [imageRef.current, buttonRef.current, matchesMd]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        height: {
          xs: 'inherit',
          md: 'min(100vh, 900px)',
        },
        position: 'relative',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        zIndex: 20,
      }}
      ref={ref}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: {
            xs: 'relative',
            md: 'absolute',
          },
          top: {
            xs: 0,
            md: '50%',
          },
          left: {
            xs: 0,
            md: '50%',
          },
          transform: {
            xs: 'none',
            md: 'translate(-50%, -50%)',
          },
          zIndex: 2,
          [colorType === 'light' ? 'pl' : 'pr']: {
            xs: 3,
            md: 'inherit',
          },
          [colorType === 'light' ? 'pr' : 'pl']: {
            xs: 1.5,
            md: 'inherit',
          },
        }}
      >
        <Box
          sx={[
            {
              border: `${colorType === 'light' ? '#fff' : '#000'} 0.5rem solid`,
              width: {
                xs: '100%',
                md: '70%',
              },
              position: 'relative',
              overflow: 'hidden',
              filter: {
                xs: 'drop-shadow(8rem 14rem 8rem #000000)',
                md: 'drop-shadow(8rem 8rem 18rem #000000)',
              },
              height: {
                xs: '240px',
                md: 'auto',
              },
            },
            {
              '& > img': {
                width: '100%',
                transform: {
                  xs: `scale(3.5) ${colorType === 'light' ? 'translate(0rem, 0.6rem)' : 'translate(0.2rem, 0.76rem)'}`,
                  md: 'scale(1.1)',
                },
              },
            },
          ]}
        >
          <img
            src={imgSrc}
            alt={imgAlt}
            ref={imageRef}
            style={{
              display: 'flex',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: {
            xs: 'relative',
            md: 'absolute',
          },
          bottom: {
            xs: '0',
            md: 'calc(50% - 33rem)',
          },
          width: {
            xs: '100%',
            md: 'initial',
          },
          [colorType === 'light' ? 'pl' : 'pr']: {
            xs: 3,
            md: 'inherit',
          },
          [colorType === 'light' ? 'pr' : 'pl']: {
            xs: 1.5,
            md: 'inherit',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            my: {
              xs: 3,
              md: 0,
            },
          }}
        >
          <MintButton mintType={colorType === 'light' ? 'beginning' : 'end'} ref={buttonRef} />
        </Box>
      </Box>
      <Typography
        variant="overline"
        sx={[
          {
            [colorType === 'light' ? 'left' : 'right']: {
              xs: 0,
              md: '4rem',
            },
            color: {
              xs: 'white',
              md: colorType === 'light' ? 'black' : 'white',
            },
            textAlign: {
              xs: 'center',
              md: colorType === 'light' ? 'left' : 'right',
            },
            fontSize: '2rem',
            lineHeight: '3rem',
            position: {
              xs: 'relative',
              md: 'absolute',
            },
            bottom: {
              xs: 0,
              md: '4rem',
            },
            width: '100%',
            zIndex: 2,
            mixBlendMode: 'difference',
            [colorType === 'light' ? 'pl' : 'pr']: {
              xs: 3,
              md: 'inherit',
            },
            [colorType === 'light' ? 'pr' : 'pl']: {
              xs: 1.5,
              md: 'inherit',
            },
          },
          {
            '& > span': {
              display: 'block',
              fontSize: '6rem',
              lineHeight: '6rem',
              fontWeight: 300,
            },
          },
        ]}
      >
        <span>
          {count}
        </span>
        Votes
      </Typography>
    </Box>
  );
};

export default ImageZoom;
