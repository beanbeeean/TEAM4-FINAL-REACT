import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../../user/components/common/login";

const initialState = {
  loading: false,
};

export const myPageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const myPageAction = myPageSlice.actions;

export default myPageSlice.reducer;
