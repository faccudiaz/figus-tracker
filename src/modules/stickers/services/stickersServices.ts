import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { StickerModel } from '../components/stickersList/stickersListContainer';
import stickersMockV1 from '../mocks/stickersMockV1.json';

export const fetchStickerByCode = (code: string) => {
  const exactResult = stickersMockV1.filter((sticker) => sticker.code === code.toUpperCase());
  return exactResult.length > 0
    ? exactResult
    : stickersMockV1.filter((sticker) => sticker.code.includes(code.toUpperCase()));
  // return stickersMockV1.filter((sticker) => sticker.code.includes(code.toUpperCase()))
};

export const fetchUserStickers = async () => {
  try {
    let response: any = [];
    await getDocs(collection(db, 'stickers')).then((querySnapshot) => {
      let arr: any = [];
      querySnapshot.docs.map((doc) => arr.push({ ...doc.data() }));
      console.log('fetched UserStickers');
      response = [...arr];
      // return response
    });
    return response;
  } catch (error) {
    console.log({ error });
  }
};

export const addUserSticker = async (sticker: StickerModel) => {
  try {
    let response: any = [];
    await setDoc(doc(db, 'stickers', sticker.code), {
      ...sticker
    }).then((res) => {
      response = {
        code: 200,
        data: {
          codeService: 'Added'
        },
        message: 'StickerAdded'
      };
    });
    console.log('sticker removed ');
    return response;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const removeUserSticker = async (sticker: StickerModel) => {
  try {
    let response = {};
    await deleteDoc(doc(db, 'stickers', sticker.code)).then((res) => {
      response = {
        code: 200,
        data: {
          codeService: 'REMOVED'
        },
        message: 'StickerRemoved'
      };
    });
    console.log('sticker removed ');
    return response;
  } catch (e) {
    console.error('Error removing sticker: ', e);
  }
};
