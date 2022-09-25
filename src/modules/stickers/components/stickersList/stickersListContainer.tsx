import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { db } from '../../../../utils/firebase';
import StickersList from './stickersList';
import MockV1 from '../../mocks/stickersMockV1.json';
import { fetchStickersByUser, getDocumentIdByUserUid } from '../../services/stickersServices';
import { addStickerAction, removeStickerAction, setStickersAction } from '../../redux/stickersSlice';
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
  const [userStickers, setUserStickers] = useState<StickerModel[]>([]);
  const stickersTest = useSelector((state: any) => state.stickers.stickers)
  const userUid = useSelector((state: any) => state.user.uid)
  const dispatch = useDispatch()

  const fetchAllStickers = useCallback(() => {
    setStickers([...MockV1]);
  }, []);

  const fetchUserStickers = useCallback(async () => {
    getDocs(collection(db, 'stickers')).then((querySnapshot) => {
      let arr: any = [];
      querySnapshot.docs.map((doc) => arr.push({ ...doc.data() }));
      setUserStickers([...userStickers, ...arr]);
    });
  }, [userStickers]);

  const handleFetchStickersByUser = async () => {
    const idDocUser: any = await getDocumentIdByUserUid(userUid)
    const stickersByUser: any = await fetchStickersByUser(idDocUser);
    console.log({ stickersByUser })
    dispatch(setStickersAction(stickersByUser))
    setUserStickers(stickersByUser);
  };

  const addUserSticker = useCallback(
    async (sticker: StickerModel) => {
      try {
        await setDoc(doc(db, 'users/' + userUid + '/stickers', sticker.code), {
          ...sticker
        });
        dispatch(addStickerAction(sticker))
        console.log('stickers written');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    [dispatch, userUid]
  );

  const removeUserSticker = useCallback(
    async (sticker: StickerModel) => {
      try {
        await deleteDoc(doc(db, 'users/' + userUid + '/stickers', sticker.code));
        dispatch(removeStickerAction(sticker))
        console.log('sticker removed');
      } catch (e) {
        console.error('Error removing sticker: ', e);
      }
    },
    [dispatch, userUid]
  );

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
    // console.log({ stickersOfCountries })
    setStickers(
      stickersOfCountries.sort((a, b) => {
        if (typeof a.country === 'undefined' || typeof b.country === 'undefined') {
          return 0;
        }
        return a.country < b.country ? -1 : 1;
      })
    );
  };

  return (
    userUid &&
    <StickersList
      stickers={stickers}
      userStickers={stickersTest}
      fetchAllStickers={fetchAllStickers}
      fetchUserStickers={fetchUserStickers}
      handleFetchStickersByUser={handleFetchStickersByUser}
      addUserSticker={addUserSticker}
      removeUserSticker={removeUserSticker}
      handleOrderBy={handleOrderBy}
      userUid={userUid}
    />
  );
};

export default StickersListContainer;
