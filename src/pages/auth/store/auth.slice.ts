import { createSlice } from "@reduxjs/toolkit";

import { fetchSignIn, fetchSignUp, fetchCheckEmail, fetchConfirmEmail, fetchChangePassword } from "./auth.actions";

interface IAuthError {
  statusCode: number;
  error: string;
  message: string;
}

type IInitialState = {
  token: string;
  errors: IAuthError | null;
  pending: boolean;
};

const initialState = {
  token: "",
  errors: null,
  pending: false,
} as IInitialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    clearErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload;
        state.errors = null;
      })
      .addCase(fetchSignIn.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload;
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchSignUp.fulfilled, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.token = action.payload;
        state.errors = null;
      })
      .addCase(fetchSignUp.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload || { statusCode: 0, error: "Unknown", message: "Unknown error" };
      })
      .addCase(fetchCheckEmail.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCheckEmail.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload;
        state.errors = null;
      })
      .addCase(fetchCheckEmail.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload;
      })
      .addCase(fetchConfirmEmail.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload;
        state.errors = null;
      })
      .addCase(fetchConfirmEmail.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload;
      })
      .addCase(fetchChangePassword.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchChangePassword.fulfilled, (state, action) => {
        state.pending = false;
        state.token = action.payload;
        state.errors = null;
      })
      .addCase(fetchChangePassword.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload;
      })
  },
});

const { reducer } = authSlice;
export default reducer;
export const { logout, clearErrors } = authSlice.actions;
export { fetchSignIn };
