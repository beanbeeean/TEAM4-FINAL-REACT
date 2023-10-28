import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN } from '../../../user/components/common/login';

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
      localStorage.removeItem(ACCESS_TOKEN);
      state.flag = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer