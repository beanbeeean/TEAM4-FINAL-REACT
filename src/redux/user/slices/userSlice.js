import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../../user/components/common/login";

const initialState = {
  userDto: {},
  flag: 0,
  userDtos: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.flag = 1;
      state.userDto = action.payload;
      console.log(state.userDto);
    },

    userLogout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      state.flag = 0;
      state.userDto = {};
    },

    fetchUserDtos: (state, action) => {
      state.userDtos = action.payload;
      console.log("state.userDtos: ", state.userDtos);
    },

    updateUserState: (state, action) => {
      state.userDtos.forEach((e, idx) => {
        if (e.u_no === action.payload) {
          state.userDtos[idx].u_state = e.u_state === 0 ? 1 : 0;
          console.log("state.userDtos 1: ", state.userDtos);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout, fetchUserDtos, updateUserState } =
  userSlice.actions;

export default userSlice.reducer;
