import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  mainMenu: 1,
  reservationMenu: 1,
  bookMenu: "all",
  mypageMenu: 1,
  communityMenu: 1,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  //action을 담자.
  reducers: {
    setMainMenu: (state, action) => {
      state.mainMenu = action.payload;
      state.reservationMenu = 1;
      state.mypageMenu = 1;
      // state.communityMenu = 1;
    },
    setReservationMenu: (state, action) => {
      state.reservationMenu = action.payload;
    },
    setBookMenu: (state, action) => {
      state.bookMenu = action.payload;
    },
    setCommunityMenu: (state, action) => {
      state.communityMenu = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;
