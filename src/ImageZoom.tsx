import {
  Box, Typography, Button, useMediaQuery, useTheme,
} from '@mui/material';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import React, { useCallback, useEffect, useRef } from 'react';

type Props = {
  imgSrc: string,
  imgAlt: string,
  colorType: 'light' | 'dark',
  count: number,
  // eslint-disable-next-line no-unused-vars
  setIncrement: (x: number) => void,
}

type AnimationSettings = {
  scale: number,
  y: number,
  duration: number,
  ease: string
}

const magnification: number = 1.7;

const zoomShadowAimation: AnimationSettings = {
  scale: magnification,
  y: 0,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const zoomImageAnimation: AnimationSettings = {
  scale: magnification,
  y: -70,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

// const translateTextAnimation: AnimationSettings = {
//   scale: 1,
//   y: -70,
//   duration: 0.5,
//   ease: 'back.in(1.7)',
// };

// const resetTextAnimation: AnimationSettings = {
//   scale: 1.0,
//   y: 0,
//   duration: 0.5,
//   ease: 'back.in(1.7)',
// };

const resetAnimation: AnimationSettings = {
  scale: 1.1,
  y: 0,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const ImageZoom: React.FC<Props> = ({
  imgSrc, imgAlt, colorType, count, setIncrement,
}) => {
  const shadowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const incrementUp = useCallback(() => {
    setIncrement(count + 1);
  }, [count]);

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const onMouseEnter = () => {
      gsap.to(shadowRef.current, zoomShadowAimation);
      gsap.to(imageRef.current, zoomImageAnimation);
      // gsap.to(textRef.current, translateTextAnimation);
    };

    const onMouseLeave = () => {
      gsap.to(shadowRef.current, resetAnimation);
      gsap.to(imageRef.current, resetAnimation);
      // gsap.to(textRef.current, resetTextAnimation);
    };

    if (imageRef.current && buttonRef.current && textRef.current && matchesMd) {
      imageRef.current.addEventListener('mouseenter', onMouseEnter);
      imageRef.current.addEventListener('mouseleave', onMouseLeave);
      buttonRef.current.addEventListener('mouseenter', onMouseEnter);
      buttonRef.current.addEventListener('mouseleave', onMouseLeave);
      // textRef.current.addEventListener('mouseenter', onMouseEnter);
      // textRef.current.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (imageRef.current && buttonRef.current && textRef.current && matchesMd) {
        imageRef.current.removeEventListener('mouseenter', onMouseEnter);
        imageRef.current.removeEventListener('mouseleave', onMouseLeave);
        buttonRef.current.removeEventListener('mouseenter', onMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', onMouseLeave);
        // textRef.current.removeEventListener('mouseenter', onMouseEnter);
        // textRef.current.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [shadowRef.current, imageRef.current]);

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
                  xs: `scale(3.5) ${colorType === 'light' ? 'translate(0rem, 0.6rem)' : 'translate(1.2rem, 0.1rem)'}`,
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
          background: colorType === 'light' ? '#dadada' : '#212121',
          width: 'min(39vw, 530px)',
          height: 'min(39vw, 530px)',
          position: 'absolute',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.1)',
          display: {
            xs: 'none',
            md: 'inherit',
          },
        }}
        ref={shadowRef}
      />
      <Box
        sx={{
          position: {
            xs: 'relative',
            md: 'absolute',
          },
          bottom: {
            xs: '0',
            md: '24rem',
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
            zIndex: '2',
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
          <Button
            variant="contained"
            color={colorType === 'light' ? 'secondary' : 'success'}
            ref={buttonRef}
            sx={{
              py: 1.5,
              px: 3,
              width: {
                xs: '100%',
                md: 'inherit',
              },
            }}
            onClick={incrementUp}
          >
            <Typography
              variant="body2"
              color={colorType === 'light' ? 'primary' : 'secondary'}
              sx={{
                fontSize: '1.5rem',
                lineHeight: '2.0rem',
              }}
            >
              Mint &#40;0.05 Eth&#41;
            </Typography>
          </Button>
        </Box>
      </Box>
      <Typography
        variant="overline"
        sx={[
          {
            color: '#fff',
            [colorType === 'light' ? 'left' : 'right']: {
              xs: 0,
              md: '4rem',
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
        ref={textRef}
      >
        <span>
          {count}
        </span>
        Minted
      </Typography>
    </Box>
  );
};

export default ImageZoom;
