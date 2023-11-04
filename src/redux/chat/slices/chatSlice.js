import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  storeUserList: [],
  storeChatRoomList: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  //action을 담자.
  reducers: {
    getUserList: (state, action) => {
      state.storeUserList = action.payload;
    },
    getChatRoomList: (state, action) => {
      state.storeChatRoomList = action.payload;
      console.log("방 목록 ", action.payload);
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
