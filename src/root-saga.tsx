import { all } from "redux-saga/effects";
import { addStickersSaga, listStickersSaga, removeStickersSaga } from "./modules/stickers/redux/sagas";

export default function* rootSaga() {
    yield all([
        listStickersSaga(),
        addStickersSaga(),
        removeStickersSaga()
    ])
}