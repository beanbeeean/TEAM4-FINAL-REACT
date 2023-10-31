<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import seatReducer from './user/slices/seatSlice'
import userReducer from './user/slices/userSlice'
=======
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./user/slices/counterSlice";
import userReducer from "./user/slices/userSlice";
>>>>>>> 3ff49e4bee881156ba8a5a165dc3b076b68aa7ee
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookSlice from "./book/slices/bookSlice";
import communitySlice from "./community/slices/communitySlice";

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
  },
});
