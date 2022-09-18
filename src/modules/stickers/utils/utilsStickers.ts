import { StickerModel } from '../components/stickersList/stickersListContainer';
import { addUserSticker, removeUserSticker } from '../services/stickersServices';

export const handleClickSticker = async (userStickers: StickerModel[], sticker: StickerModel) => {
  userStickers.some((userSticker) => userSticker.code === sticker.code)
    ? removeUserSticker(sticker)
    : addUserSticker(sticker);
};
