import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import StickersList from './stickersList'

export interface StickerModel {
    code: string,
    name: string,
    country?: string,
    group?: string
}

const StickersListContainer = () => {
    const [userStickers, setUserStickers] = useState<StickerModel[]>([])

    const fetchUserStickers = async () => {
        getDocs(collection(db, "stickers"))
            .then((querySnapshot => {
                let arr: any = [];
                querySnapshot.docs.map((doc) =>
                    arr.push({ ...doc.data() })
                );
                console.log({ arr })
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
        console.log('remove')
        try {
            await deleteDoc(doc(db, "stickers", sticker.code));
            setUserStickers(userStickers.filter(function (userSticker) {
                return userSticker.code !== sticker.code
            }))
            console.log("sticker remove");
        } catch (e) {
            console.error("Error removing sticker: ", e);
        }
    }

    return (
        <StickersList
            userStickers={userStickers}
            fetchUserStickers={fetchUserStickers}
            addUserSticker={addUserSticker}
            removeUserSticker={removeUserSticker}
        />
    )
}

export default StickersListContainer