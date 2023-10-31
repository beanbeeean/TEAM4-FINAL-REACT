import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const seatSlice = createSlice({
  name: 'chk',
  initialState,
  reducers: {
    seatChk: (state) => {
      state.value = 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { seatChk } = seatSlice.actions

export default seatSlice.reducer