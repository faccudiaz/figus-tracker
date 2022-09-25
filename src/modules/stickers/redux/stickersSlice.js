import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    uid: ''
}

export const stickersSlice = createSlice({
    name: 'stickers',
    initialState: initialState,
    reducers: {
        addStickerAction: (state, action) => {
            state.stickers = [...state.stickers, action.payload]
        },
        removeStickerAction: (state, action) => {
            const arrFiltered = state.stickers.filter((sticker) => sticker.code !== action.payload.code);
            console.log(arrFiltered)
            state.stickers = arrFiltered
        },
        setStickersAction: (state, action) => {
            state.stickers = action.payload
        },
        resetStickersAction: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addStickerAction, removeStickerAction, setStickersAction, resetStickersAction } = stickersSlice.actions

export default stickersSlice.reducer