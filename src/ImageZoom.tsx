import { Box } from '@mui/material';
import React from 'react';

type Props = {
  imgSrc: string,
  imgAlt: string,
  colorType: 'light' | 'dark',
}

const ImageZoom: React.FC<Props> = ({ imgSrc, imgAlt, colorType }) => (
  <Box
    sx={{
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      py: 30,
      position: 'relative',
      background: colorType === 'light' ? '#efefef' : '#141414',
      overflow: 'hidden',
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
    />
    <Box
      style={{
        border: `${colorType === 'light' ? '#fff' : '#000'} 4px solid`,
        width: '70%',
        position: 'relative',
      }}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        style={{
          width: '100%',
          display: 'flex',
        }}
      />
    </Box>
  </Box>
);

export default ImageZoom;
