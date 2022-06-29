import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';
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

  useEffect(() => {
    const onMouseEnter = () => {
      if (shadowRef.current && imageRef.current) {
        gsap.to(shadowRef.current, zoomShadowAimation);
        gsap.to(imageRef.current, zoomImageAnimation);
      }
    };

    const onMouseLeave = () => {
      if (shadowRef.current && imageRef.current) {
        gsap.to(shadowRef.current, resetAnimation);
        gsap.to(imageRef.current, resetAnimation);
      }
    };

    if (imageRef.current && buttonRef.current) {
      imageRef.current.addEventListener('mouseenter', onMouseEnter);
      imageRef.current.addEventListener('mouseleave', onMouseLeave);
      buttonRef.current.addEventListener('mouseenter', onMouseEnter);
      buttonRef.current.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (imageRef.current && buttonRef.current) {
        imageRef.current.removeEventListener('mouseenter', onMouseEnter);
        imageRef.current.removeEventListener('mouseleave', onMouseLeave);
        buttonRef.current.removeEventListener('mouseenter', onMouseEnter);
        buttonRef.current.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [shadowRef.current, imageRef.current]);

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        background: colorType === 'light' ? '#efefef' : '#141414',
        overflow: 'hidden',
        pt: 30,
        pb: 8,
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          mb: 17,
        }}
      >
        <Box
          sx={{
            background: colorType === 'light' ? '#dadada' : '#212121',
            width: '580px',
            height: '580px',
            position: 'absolute',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          ref={shadowRef}
        />
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
          position: 'relative',
          zIndex: '2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          ref={buttonRef}
        >
          <Typography variant="body2" color="secondary">Mint &#40;0.05&#41;</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ImageZoom;
