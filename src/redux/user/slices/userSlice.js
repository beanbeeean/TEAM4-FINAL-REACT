import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flag: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin : (state) => {
      state.flag = 1
    },
    userLogout : (state) => {
      state.flag = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer