import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { stat } from "fs";
import { Product } from "../types/types";
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios(`${BASE_URL}/products`);
    return response.data;
  }
);

export const getSingleProduct = createAsyncThunk(
  'product/getSingleProduct', 
  async (id:string) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
}
);

const prod: Product ={
  id:0,
  title:"",
  price:0,
  description:"",
  images:[],
  category:{
    id:0,
    name:"",
    image:"",
    creationAt:"",
    updatedAt:"",
  },
  creationAt:"",
  updatedAt:""

}
const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    product: prod,
    filtered: [],
    sorted: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    sortByPrice: (state, { payload }) => {
    
      state.sorted = state.list.filter(({ price }) => price < payload);
    },
    filteredByCategories: (state, { payload }) => {
      state.filtered = state.list.filter(({ categories }) => categories === payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
      state.isLoading = false;
    });
    builder.addCase(getSingleProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { sortByPrice, filteredByCategories } = productsSlice.actions;


export default productsSlice.reducer;