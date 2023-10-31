import { configureStore } from '@reduxjs/toolkit'
import seatReducer from './user/slices/seatSlice'
import userReducer from './user/slices/userSlice'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    seat: seatReducer,
    user: persistedReducer,
  },
})