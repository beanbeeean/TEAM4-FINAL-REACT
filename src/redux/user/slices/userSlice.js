import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../../user/components/common/login";

const initialState = {
  userDto: {},
  flag: 0,
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

    fetchUserDto: (state, action) => {
      state.userDto = action.payload.dtos;
      console.log("state.userDto: ", state.userDto);
    },

    fetchAdminDto: (state, action) => {
      state.userDto = action.payload.dtos;
      console.log("state.userDto: ", state.userDto);
    },

    updateUserState: (state, action) => {
      state.userDto.forEach((e, idx) => {
        if (e.u_no === action.payload) {
          state.userDto[idx].u_state = e.u_state === 0 ? 1 : 0;
          console.log("state.userDto 1: ", state.userDto);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userLogin,
  userLogout,
  fetchUserDto,
  fetchAdminDto,
  updateUserState,
} = userSlice.actions;

export default userSlice.reducer;
