import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        uid: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUid: (state, action) => {
            state.uid = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions
export const { setUid } = userSlice.actions

export const selectUser = (state) => state.toggle;


export default userSlice.reducer