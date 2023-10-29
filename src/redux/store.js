import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./user/slices/counterSlice";
import userReducer from "./user/slices/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookSlice from "./book/slices/bookSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: persistedReducer,
    book: bookSlice,
  },
});
