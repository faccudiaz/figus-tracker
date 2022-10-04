import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    uid: ''
}
const name = 'stickers';

export const stickersSlice = createSlice({
    name: name,
    initialState: initialState,
    reducers: {
        addStickerAction: (state, action) => {
            state.stickers = [...state.stickers, action.payload]
        },
        removeStickerAction: (state, action) => {
            const arrFiltered = state.stickers.filter((sticker) => sticker.code !== action.payload.code);
            state.stickers = arrFiltered
        },
        setStickersAction: (state, action) => {
            state.stickers = action.payload
        },
        resetStickersAction: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const { addStickerAction, removeStickerAction, setStickersAction, resetStickersAction } = stickersSlice.actions
export const fetchStickers = createAction(`${stickersSlice}/fetchStickers`, payload => ({ payload }));
export const addSticker = createAction(`${stickersSlice}/addSticker`, payload => ({ payload }));
export const removeSticker = createAction(`${stickersSlice}/removeSticker`, payload => ({ payload }));
export default stickersSlice.reducer