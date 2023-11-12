import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  storeUserList: [],
  storeUserDetail: [],
  storeChatRoomList: [],
  isClick: false,
  storeRoomId: "",
  storeRoomName: "",
  loading: false,
  // chatShow: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  //action을 담자.
  reducers: {
    getUserList: (state, action) => {
      state.storeUserList = action.payload;
    },
    getUserDetail: (state, action) => {
      state.storeUserDetail = action.payload;
    },
    getChatRoomList: (state, action) => {
      state.storeChatRoomList = action.payload;
      console.log("방 목록 ", action.payload);
    },
    clickToggle: (state, action) => {
      state.isClick = action.payload;
    },
    getRoomId: (state, action) => {
      state.storeRoomId = action.payload.id;
      state.storeRoomName = action.payload.name;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // chatShowToggle: (state, action) => {
    //   state.chatShow = action.payload;
    // },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
