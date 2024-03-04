import $api from "../../../api/api";
import { AxiosError, AxiosResponse } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { TCreateFeedback } from "@shared/create-feedback.type";
import { TGetFeedback } from "@shared/get-feedback.type";


export const fetchCreateFeedback = createAsyncThunk(
  "feedbacks/fetchCreateFeedback",
  async (data: TCreateFeedback, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await $api.post(`/feedback`, data);
      return { status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message as string);
      }
    }
  }
);

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<TGetFeedback[]> = await $api.get(`/feedback`);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }
    }
  }
);