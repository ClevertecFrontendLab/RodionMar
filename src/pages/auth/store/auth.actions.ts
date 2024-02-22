import $api from "../../../api/api";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAuth } from "../../../types/auth.interface";
import { ICheckEmail } from "../../../types/check-email.interface";
import { IConfirmEmail } from "../../../types/confirm-email.interface";
import { IChangePassword } from "../../../types/change-password.interface";


export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (data: IAuth, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/login`, data);
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (data: IAuth, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/registration`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const fetchCheckEmail = createAsyncThunk(
  "auth/fetchCheckEmail",
  async (data: ICheckEmail, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/check-email`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({status: error?.response.status, message: error?.response.data.message});
    }
  }
);

export const fetchConfirmEmail = createAsyncThunk(
  "auth/fetchConfirmEmail",
  async (data: IConfirmEmail, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/confirm-email`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchChangePassword = createAsyncThunk(
  "auth/fetchChangePassword",
  async (data: IChangePassword, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/change-password`, data, {
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);