import { configureStore } from '@reduxjs/toolkit';
import globalInfoReducer from "./reducers/global-info"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    globalInfo: globalInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store
