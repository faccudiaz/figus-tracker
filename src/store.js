import { configureStore } from '@reduxjs/toolkit'
import stickersReducer from './modules/stickers/redux/stickersSlice'
import userReducer from './modules/auth/redux/authSlice'

export default configureStore({
    reducer: {
        stickers: stickersReducer,
        user: userReducer
    },
})