import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser } from "@/features/auth/api/authApi";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "unauthenticated",
  error: null,
};

interface SetCredentialsPayload {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.status = "authenticated";
      state.error = null;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "unauthenticated";
      state.error = null;
    },

    setAuthLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },

    setAuthError: (state, action: PayloadAction<string>) => {
      state.status = "unauthenticated";
      state.error = action.payload;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  setAuthLoading,
  setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
