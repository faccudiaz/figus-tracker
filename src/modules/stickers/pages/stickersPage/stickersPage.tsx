import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import StickersList from '../../components/stickersList/stickersList';

const StickersPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StickersList />
    </Box>
  )
}

export default StickersPage