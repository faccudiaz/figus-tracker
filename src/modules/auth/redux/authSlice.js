import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    uid: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUid: (state, action) => {
            state.uid = action.payload
        },
        resetUser: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setUid, resetUser } = userSlice.actions

export const selectUser = (state) => state.toggle;


export default userSlice.reducer