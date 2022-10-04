import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import { StickerModel } from './stickersListContainer';
import { SelectChangeEvent } from '@mui/material/Select';
import HeaderStickerlist from './headerStickerList/headerStickerlist';
import ViewAllStickers from './viewAllStickers/viewAllStickers';
import ViewStickersByCountry from './viewStickersByCountry/viewStickersByCountry';
import ViewStickersByGroups from './viewStickersByGroups/viewStickersByGroups';

interface StickersListProps {
  handleFetchStickersByUser: Function;
  fetchAllStickers: Function;
  addUserSticker: Function;
  removeUserSticker: Function;
  userStickers: StickerModel[];
  stickers: StickerModel[];
  handleOrderBy: Function;
  userUid: string
}

const StickersList: React.FC<StickersListProps> = ({
  userStickers,
  stickers,
  fetchAllStickers,
  handleFetchStickersByUser,
  addUserSticker,
  removeUserSticker,
  handleOrderBy,
  userUid
}) => {
  const [orderBy, setOrderBy] = React.useState('all');

  useEffect(() => {
    fetchAllStickers();
    handleFetchStickersByUser(userUid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSticker = useCallback(
    async (sticker: StickerModel) => {
      userStickers.some((userSticker) => userSticker.code === sticker.code)
        ? removeUserSticker(sticker)
        : addUserSticker(sticker);
    },
    [addUserSticker, removeUserSticker, userStickers]
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setOrderBy(event.target.value as string);
      handleOrderBy(event.target.value);
    },
    [handleOrderBy]
  );

  const checkIsStickerObtainedByUser = useCallback(
    (code: string) => {
      return userStickers?.some((userSticker) => userSticker.code === code);
    },
    [userStickers]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ display: 'grid', padding: '0px 0' }}>
          <HeaderStickerlist orderBy={orderBy} handleChange={handleChange} />
          <div style={{ display: 'grid', padding: '30px 0px', gap: 30 }}>
            {orderBy === 'all' ? (
              <ViewAllStickers
                checkIsStickerObtainedByUser={checkIsStickerObtainedByUser}
                handleClickSticker={handleClickSticker}
                stickers={stickers}
              />
            ) : orderBy === 'countries' ? (
              <ViewStickersByCountry
                checkIsStickerObtainedByUser={checkIsStickerObtainedByUser}
                handleClickSticker={handleClickSticker}
                stickers={stickers}
              />
            ) : (
              <ViewStickersByGroups
                stickers={stickers}
                checkIsStickerObtainedByUser={checkIsStickerObtainedByUser}
                handleClickSticker={handleClickSticker}
              />
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default StickersList;
