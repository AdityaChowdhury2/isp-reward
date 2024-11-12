import { authApi } from "@/redux/services/auth";
import { RootState } from "@/redux/store/store";
import { createSlice } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  error: FetchBaseQueryError | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => initialState,
    // authLoading: (state) => {
    //   state.isLoading = true;
    // },
    // authSuccess: (state, action) => {
    //   state.user = action.payload;
    //   state.token = action.payload.token;
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // authError: (state, action) => {
    //   state.token = null;
    //   state.error = action.payload;
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.payload as FetchBaseQueryError;
      })
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
