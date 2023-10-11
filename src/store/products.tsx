import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { Product } from "../types/types";
import { response } from "msw";
import CreateProduct from "../components/CreateProduct";
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

export const createProduct = createAsyncThunk(
  'product/createProduct', 
  async (userData:{title: string, price:number, description: string, categoryId: number, images:string[]}) => {
  const response = await axios.post(`${BASE_URL}/products/`, JSON.stringify(userData), {
          headers: {
            'Content-Type': 'application/json',
          },
      });  
      return response.data;
    }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct', 
  async (userData:{id:number, title: string, price:number, description: string, categoryId: number, images:string[]}) => {
    console.log("#################", JSON.stringify(userData))
   const response = await axios.put(`${BASE_URL}/products/${userData.id}`, JSON.stringify(userData), {
    headers: {
      'Content-Type': 'application/json',
    },
      });  
      return response.data;
    }
);


export const deleteProduct = createAsyncThunk(
  'product/deleteProduct', 
  async (userData:{id:number}) => {
  const response = await axios.delete(`${BASE_URL}/products/${userData.id}`);
  console.log("###########Reponse: Delete", userData.id)  
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
    createdProduct: initialStateProduct,
    productDeleted: false,
    productUpdated: false,
    related: [],
    isLoading: false,
  },
  reducers: {
    refreshProductUpdated:(state) =>{
      state.productUpdated=false
    },
    refreshProductDeleted:(state) =>{
      state.productDeleted=false
    },
    createdProductInitialize:(state) =>{
      state.createdProduct=initialStateProduct
    },
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
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.productUpdated=true
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productDeleted=true
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.createdProduct = payload;
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });
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
export const {refreshProductUpdated, refreshProductDeleted, createdProductInitialize, unsortByPrice, sortByPriceRange, sortByPriceAsc, sortByPriceDesc,filteredByCategories } = productsSlice.actions;


export default productsSlice.reducer;