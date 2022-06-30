import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useRef } from 'react';

type Props = {
  imgSrc: string,
  imgAlt: string,
  colorType: 'light' | 'dark',
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

const translateTextAnimation: AnimationSettings = {
  scale: 1,
  y: -70,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const resetTextAnimation: AnimationSettings = {
  scale: 1.0,
  y: 0,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const resetAnimation: AnimationSettings = {
  scale: 1.1,
  y: 0,
  duration: 0.5,
  ease: 'back.in(1.7)',
};

const ImageZoom: React.FC<Props> = ({ imgSrc, imgAlt, colorType }) => {
  const shadowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const onMouseEnter = () => {
      gsap.to(shadowRef.current, zoomShadowAimation);
      gsap.to(imageRef.current, zoomImageAnimation);
      gsap.to(textRef.current, translateTextAnimation);
    };

    const onMouseLeave = () => {
      gsap.to(shadowRef.current, resetAnimation);
      gsap.to(imageRef.current, resetAnimation);
      gsap.to(textRef.current, resetTextAnimation);
    };

    if (imageRef.current && buttonRef.current && textRef.current) {
      imageRef.current.addEventListener('mouseenter', onMouseEnter);
      imageRef.current.addEventListener('mouseleave', onMouseLeave);
      buttonRef.current.addEventListener('mouseenter', onMouseEnter);
      buttonRef.current.addEventListener('mouseleave', onMouseLeave);
      textRef.current.addEventListener('mouseenter', onMouseEnter);
      textRef.current.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (imageRef.current && buttonRef.current && textRef.current) {
        imageRef.current.removeEventListener('mouseenter', onMouseEnter);
        imageRef.current.removeEventListener('mouseleave', onMouseLeave);
        buttonRef.current.removeEventListener('mouseenter', onMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', onMouseLeave);
        textRef.current.removeEventListener('mouseenter', onMouseEnter);
        textRef.current.removeEventListener('mouseleave', onMouseLeave);
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
        background: colorType === 'light' ? '#efefef' : '#141414',
        overflow: 'hidden',
        height: 'min(100vh, 900px)',
        position: 'relative',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            border: `${colorType === 'light' ? '#fff' : '#000'} 0.5rem solid`,
            width: '70%',
            position: 'relative',
            overflow: 'hidden',
            filter: 'drop-shadow(8rem 8rem 144px #000000)',
          }}
        >
          <img
            src={imgSrc}
            alt={imgAlt}
            ref={imageRef}
            style={{
              width: '100%',
              display: 'flex',
              transform: 'scale(1.1)',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          background: colorType === 'light' ? '#dadada' : '#212121',
          width: '530px',
          height: '530px',
          position: 'absolute',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.1)',
        }}
        ref={shadowRef}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '8rem',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: `${colorType === 'light' ? '#212121' : '#fff'}`,
              fontSize: '2rem',
              lineHeight: '3rem',
              position: 'absolute',
              top: -1,
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: '100%',
            }}
            ref={textRef}
          >
            Coming soon
          </Typography>
          <Button
            variant="contained"
            color={colorType === 'light' ? 'primary' : 'secondary'}
            ref={buttonRef}
            sx={{
              py: 1.5,
              px: 3,
            }}
          >
            <Typography
              variant="body2"
              color={colorType === 'light' ? 'secondary' : 'primary'}
              sx={{
                fontSize: '1.5rem',
                lineHeight: '2remm',
              }}
            >
              Mint &#40;0.05 Eth&#41;
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageZoom;
