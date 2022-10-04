import { combineReducers } from 'redux';
import stickersReducer from './modules/stickers/redux/reducers/stickersSlice'
import userReducer from './modules/auth/redux/authSlice'

const rootReducer = combineReducers({
    stickers: stickersReducer,
    user: userReducer
})

export default rootReducer;