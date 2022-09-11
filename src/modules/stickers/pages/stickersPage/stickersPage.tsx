import * as React from 'react';
import Box from '@mui/material/Box';
import StickersList from '../../components/stickersList';

const StickersPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StickersList />
    </Box>
  )
}

export default StickersPage