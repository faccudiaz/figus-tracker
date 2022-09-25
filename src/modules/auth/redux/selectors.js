import { createSelector } from "@reduxjs/toolkit"

const userState = state => state.user

const selectUser = createSelector([userState], (user) => {
    return user
})

export const userSelector = createSelector(selectUser, ({ user }) => user);
