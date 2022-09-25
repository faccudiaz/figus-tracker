import { createSlice } from '@reduxjs/toolkit'

export const stickersSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        stickers: []
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        addStickerAction: (state, action) => {
            state.stickers = [...state.stickers, action.payload]
        },
        setStickersAction: (state, action) => {
            state.stickers = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addStickerAction, setStickersAction } = stickersSlice.actions

export default stickersSlice.reducer