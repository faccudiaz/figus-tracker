import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import StickersList from './stickersList'
import MockV1 from '../../mocks/stickersMockV1.json'

export interface StickerModel {
    code: string,
    name: string,
    country?: string,
    group?: string
}

const StickersListContainer = () => {
    const mockStickers = [...MockV1];
    const [stickers, setStickers] = useState<StickerModel[]>([])
    const [userStickers, setUserStickers] = useState<StickerModel[]>([])

    const fetchAllStickers = () => {
        setStickers([...MockV1])
    }

    const fetchUserStickers = async () => {
        getDocs(collection(db, "stickers"))
            .then((querySnapshot => {
                let arr: any = [];
                querySnapshot.docs.map((doc) =>
                    arr.push({ ...doc.data() })
                );
                // console.log({ arr })
                setUserStickers([...userStickers, ...arr]);
            }));
    }

    const addUserSticker = async (sticker: StickerModel) => {
        try {
            await setDoc(doc(db, "stickers", sticker.code), {
                ...sticker
            });
            setUserStickers([...userStickers, sticker])
            console.log("stickers written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const removeUserSticker = async (sticker: StickerModel) => {
        try {
            await deleteDoc(doc(db, "stickers", sticker.code));
            setUserStickers(userStickers.filter(function (userSticker) {
                return userSticker.code !== sticker.code
            }))
            console.log("sticker removed");
        } catch (e) {
            console.error("Error removing sticker: ", e);
        }
    }

    const handleOrderBy = (orderBy: string) => {
        // console.log({ orderBy })
        orderBy === 'all' && sortStickersByAll();
        orderBy === 'countries' && sortStickersByCountries();
        orderBy === 'groups' && sortStickersByGroups();
    }

    const sortStickersByAll = () => setStickers(mockStickers)

    const sortStickersByGroups = () => setStickers(mockStickers)

    const sortStickersByCountries = () => {
        const stickersOfCountries: StickerModel[] = mockStickers.filter(sticker => 'country' in sticker)
        // console.log({ stickersOfCountries })
        setStickers(stickersOfCountries.sort((a, b) => {
            if (typeof a.country === 'undefined' || typeof b.country === 'undefined') {
                return 0;
            }
            return (a.country < b.country ? -1 : 1)
        }))
    }

    return (
        <StickersList
            stickers={stickers}
            userStickers={userStickers}
            fetchAllStickers={fetchAllStickers}
            fetchUserStickers={fetchUserStickers}
            addUserSticker={addUserSticker}
            removeUserSticker={removeUserSticker}
            handleOrderBy={handleOrderBy}
        />
    )
}

export default StickersListContainer