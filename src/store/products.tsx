import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
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

const initialStateProduct: Product ={
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
    listfromAPI:[initialStateProduct],
    list: [initialStateProduct],
    product: initialStateProduct,
    related: [],
    isLoading: false,
  },
  reducers: {
    sortByPriceRange: (state, {payload})=>{
      state.list = state.listfromAPI.filter(({ price }) => price < payload);
    },

    sortByPriceAsc: (state) => {
      state.list = state.listfromAPI.slice().sort((a, b) => a.price - b.price);
    },
    sortByPriceDesc: (state) => {
      state.list = state.listfromAPI.slice().sort((a, b) => b.price - a.price);
    },
    unsortByPrice: (state) => {
      state.list = state.listfromAPI;
    },
    filteredByCategories: (state, { payload }) => {
      if(payload.length===0){
        state.list = state.listfromAPI

      }else{
        state.list = state.listfromAPI.filter(({category}) => category.id == payload.id )     
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.listfromAPI = payload;
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
export const {unsortByPrice, sortByPriceRange, sortByPriceAsc, sortByPriceDesc,filteredByCategories } = productsSlice.actions;


export default productsSlice.reducer;