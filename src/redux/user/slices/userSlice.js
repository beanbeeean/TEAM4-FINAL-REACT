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
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout, fetchUserDto, fetchAdminDto } =
  userSlice.actions;

export default userSlice.reducer;
