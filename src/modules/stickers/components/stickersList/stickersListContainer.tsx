import React, { useCallback, useState } from 'react';
import StickersList from './stickersList';
import MockV1 from '../../mocks/stickersMockV1.json';
import { addSticker, fetchStickers, removeSticker } from '../../redux/reducers/stickersSlice';
import { useDispatch, useSelector } from 'react-redux';

export interface StickerModel {
  code: string;
  name: string;
  country?: string;
  group?: string;
}

const StickersListContainer = () => {
  const mockStickers = [...MockV1];
  const [stickers, setStickers] = useState<StickerModel[]>([]);
  const userStickers = useSelector((state: any) => state.stickers.stickers)
  const userUid = useSelector((state: any) => state.user.uid)
  const dispatch = useDispatch()

  const fetchAllStickers = useCallback(() => {
    setStickers([...MockV1]);
  }, []);

  const handleFetchStickersByUser = async () => {
    dispatch(fetchStickers({ userUid }))
  };

  const handleOrderBy = (orderBy: string) => {
    orderBy === 'all' && sortStickersByAll();
    orderBy === 'countries' && sortStickersByCountries();
    orderBy === 'groups' && sortStickersByGroups();
  };

  const sortStickersByAll = () => setStickers(mockStickers);

  const sortStickersByGroups = () => {
    const stickersByGroups: StickerModel[] = mockStickers.filter((sticker) => 'group' in sticker);
    setStickers(
      stickersByGroups.sort((a, b) => {
        if (typeof a.group === 'undefined' || typeof b.group === 'undefined') {
          return 0;
        }
        return a.group < b.group ? -1 : 1;
      })
    );
  };

  const sortStickersByCountries = () => {
    const stickersOfCountries: StickerModel[] = mockStickers.filter(
      (sticker) => 'country' in sticker
    );
    setStickers(
      stickersOfCountries.sort((a, b) => {
        if (typeof a.country === 'undefined' || typeof b.country === 'undefined') {
          return 0;
        }
        return a.country < b.country ? -1 : 1;
      })
    );
  };

  const handleAddUserSticker = (sticker: StickerModel) => {
    console.log('handleAddUserSticker');
    dispatch(addSticker({ sticker, userUid }))
  }

  const handleRemoveUserSticker = (sticker: StickerModel) => {
    console.log('handleRemoveUserSticker');
    dispatch(removeSticker({ sticker, userUid }))
  }

  return (
    userUid &&
    <StickersList
      stickers={stickers}
      userStickers={userStickers}
      fetchAllStickers={fetchAllStickers}
      handleFetchStickersByUser={handleFetchStickersByUser}
      addUserSticker={handleAddUserSticker}
      removeUserSticker={handleRemoveUserSticker}
      handleOrderBy={handleOrderBy}
      userUid={userUid}
    />
  );
};

export default StickersListContainer;
