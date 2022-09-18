import { Grid } from '@mui/material';
import React from 'react';
import Item from '../../../../shared/components/item/item';
import { StickerModel } from '../stickersListContainer';

interface ViewAllStickersProps {
  handleClickSticker: Function;
  checkIsStickerObtainedByUser: Function;
  stickers: StickerModel[];
}

const ViewAllStickers: React.FC<ViewAllStickersProps> = ({
  handleClickSticker,
  checkIsStickerObtainedByUser,
  stickers
}) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 40 }}>
      {stickers.map((sticker, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Item
            onClick={() => handleClickSticker(sticker)}
            style={{
              cursor: 'pointer',
              backgroundColor: checkIsStickerObtainedByUser(sticker.code) ? 'green' : ''
            }}
          >
            <span>{sticker.code}</span>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default ViewAllStickers;
