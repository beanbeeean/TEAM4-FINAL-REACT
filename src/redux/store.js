import { configureStore } from "@reduxjs/toolkit";
import seatReducer from "./user/slices/seatSlice";
import userReducer from "./user/slices/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookSlice from "./book/slices/bookSlice";
import communitySlice from "./community/slices/communitySlice";
import chatSlice from "./chat/slices/chatSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    seat: seatReducer,
    user: persistedReducer,
    book: bookSlice,
    community: communitySlice,
    chat: chatSlice,
  },
});
