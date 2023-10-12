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

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (id:number) => {
    const response = await axios(`${BASE_URL}/products/?categoryId=${id}`);
    return response.data;
  }
);

export const getProductsByPriceRange = createAsyncThunk(
  "products/getProductsByPriceRange",
  async (priceRange:{min_price:number, max_price:number}) => {
    const response = await axios(`${BASE_URL}/products/?price_min=${priceRange.min_price}&price_max=${priceRange.max_price}`);
    return response.data;
  }
);

export const getProductsByTitle = createAsyncThunk(
  "products/getProductsByTitle",
  async (title:string) => {
    const response = await axios(`${BASE_URL}/products/?title=${title}`);
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
      return response.data;
    }
);
const initialStateProduct: Product ={
}


const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [initialStateProduct],
    product: initialStateProduct,
    related: [],
    isLoading: false,
  },
  reducers: {    
    sortByPriceRange: (state, {payload})=>{
      state.list = state.list.filter(({ price }) => price !== undefined && price < payload);
    },

    sortByPriceAsc: (state) => {
      state.list = state.list.sort((a, b) =>  (a.price ?? Number.MAX_VALUE) - (b.price ?? Number.MAX_VALUE));
    },
    sortByPriceDesc: (state) => {
      state.list = state.list.sort((a, b) => (b.price ?? Number.MAX_VALUE) - (a.price ?? Number.MAX_VALUE));
    },
    filteredByCategories: (state, { payload }) => {
      if(payload.length!==0){
        state.list = state.list.filter(({category}) => category!==undefined && category.id === payload.id )     
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByTitle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByTitle.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProductsByTitle.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProductsByPriceRange.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByPriceRange.fulfilled, (state, { payload }) => {
      state.list = payload;

      state.isLoading = false;
    });
    builder.addCase(getProductsByPriceRange.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProductsByCategory.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, {payload}) => {
      state.product=payload;
      window.location.href = "/product/"+state.product.id;
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
      window.location.href = "/products";
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.product=payload;
      window.location.href = "/product/"+state.product.id;
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload
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
export const {sortByPriceRange, sortByPriceAsc, sortByPriceDesc,filteredByCategories } = productsSlice.actions;


export default productsSlice.reducer;