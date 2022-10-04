import { call, put, takeEvery } from 'redux-saga/effects'
import { addUserSticker, fetchStickersByUserUid, removeUserSticker } from '../services/stickersServices';
import { fetchStickers, setStickersAction, addSticker, addStickerAction, removeSticker, removeStickerAction } from './reducers/stickersSlice'

function* workGetStickers(params: any): any {
    try {
        const { userUid } = params.payload;
        const stickersByUser = yield call(async () => await fetchStickersByUserUid(userUid));
        yield put(setStickersAction(stickersByUser));
    } catch (error) {
        console.log({ error })
    }
}

function* workAddSticker(params: any): any {
    try {
        const { sticker, userUid } = params.payload;
        const response = yield call(async () => await addUserSticker(sticker, userUid));
        console.log({ response });
        yield put(addStickerAction(sticker));
    } catch (error) {
        console.log({ error })
    }
}

function* workRemoveSticker(params: any): any {
    console.log('sdljnksdjndfkn')
    try {
        const { sticker, userUid } = params.payload;
        const response = yield call(async () => await removeUserSticker(sticker, userUid));
        console.log({ response });
        yield put(removeStickerAction(sticker));
    } catch (error) {
        console.log({ error })
    }
}

export function* listStickersSaga() {
    yield takeEvery(fetchStickers, workGetStickers)
}

export function* addStickersSaga() {
    yield takeEvery(addSticker, workAddSticker)
}

export function* removeStickersSaga() {
    yield takeEvery(removeSticker, workRemoveSticker)
}
