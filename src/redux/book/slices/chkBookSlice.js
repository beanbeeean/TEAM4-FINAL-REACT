import { createSlice } from "@reduxjs/toolkit";

//initialState
const chkBookState = {
  chkBookDto: [
    {
      chk_b_no: 0,
      b_no: 0,
      u_email: "",
      chk_b_start_date: "",
      chk_b_end_date: "",
      chk_b_state: 1,
      chk_b_mod_date: "",
      chk_b_reg_date: "",
    },
  ],
};

const chkBookSlice = createSlice({
  name: "chkBook",
  initialState: chkBookState,
  //action을 담자.
  reducers: {
    selectChkBookDto: (state, action) => {
      state.chkBookDto = action.payload;
    },
    fetchChkBookDto: (state, action) => {
      state.chkBookDto = action.payload.dtos;
      console.log("state.chkBookDto: ", state.chkBookDto);
    },
  },
});

export const chkBookActions = chkBookSlice.actions;
export default chkBookSlice.reducer;
