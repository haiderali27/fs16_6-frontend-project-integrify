import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constants";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await axios(`${BASE_URL}/categories`);
    return response.data;
  }
);
const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        isLoading: false,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, { }) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export default categoriesSlice.reducer;