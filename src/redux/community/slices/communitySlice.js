import { createSlice } from "@reduxjs/toolkit";

//initialState
const communityState = {
  communityDto: [
    {
      c_no: 1,
      u_no: 1,
      c_category: 1,
      c_title: "",
      c_content: "",
      c_hit: 1,
      c_state: 1,
      c_reg_date: "",
      c_mod_date: "",
    },
  ],
};

const communitySlice = createSlice({
  name: "community",
  initialState: communityState,
  //action을 담자.
  reducers: {
    updateStock: (state, action) => {
      state.communityDto.forEach((e, idx) => {
        if (e.c_no === action.payload) {
          console.log("state.communityDto 1: ", state.communityDto);
        }
      });
    },

    fetchCommunityDto: (state, action) => {
      state.communityDto = action.payload;
      console.log("state.communityDto: ", state.communityDto);
    },
  },
});

export const communityActions = communitySlice.actions;
export default communitySlice.reducer;
