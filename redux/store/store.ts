import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";

export const store: Store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
