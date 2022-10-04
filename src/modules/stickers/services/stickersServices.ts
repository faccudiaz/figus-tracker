import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { StickerModel } from '../components/stickersList/stickersListContainer';
import stickersMockV1 from '../mocks/stickersMockV1.json';

export const fetchStickerByCode = (code: string) => {
  const searchResults = stickersMockV1.filter((sticker) => sticker.code === code.toUpperCase());
  return searchResults.length > 0
    ? searchResults
    : stickersMockV1.filter((sticker) => sticker.code.includes(code.toUpperCase()));
};

export const fetchStickersByUserUid = async (idDocUser: string) => {
  let response: any = [];
  await getDocs(collection(db, 'users/' + idDocUser + '/stickers')).then((querySnapshot) => {
    let arr: any = [];
    querySnapshot.docs.map((doc) => arr.push({ ...doc.data() }));
    console.log('fetched fetchStickersByUser');
    response = [...arr];
  });
  return response
}

//remove
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

export const addUserSticker = async (sticker: StickerModel, userUid: string) => {
  console.log('addUserSticker service')
  await setDoc(doc(db, 'users/' + userUid + '/stickers', sticker.code), {
    ...sticker
  });
}

export const removeUserSticker = async (sticker: StickerModel, userUid: string) => {
  console.log('removeUserSticker service')
  await deleteDoc(doc(db, 'users/' + userUid + '/stickers', sticker.code));
};

// export const removeUserSticker = async (sticker: StickerModel) => {
//   try {
//     let response = {};
//     await deleteDoc(doc(db, 'stickers', sticker.code)).then((res) => {
//       response = {
//         code: 200,
//         data: {
//           codeService: 'REMOVED'
//         },
//         message: 'StickerRemoved'
//       };
//     });
//     console.log('sticker removed ');
//     return response;
//   } catch (e) {
//     console.error('Error removing sticker: ', e);
//   }
// };
