// Path: ./src/redux/store/index.tsx

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../reducers/UserReducer";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;