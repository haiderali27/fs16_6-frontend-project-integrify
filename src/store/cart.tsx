import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../types/types'



const initialState: CartState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const productToAdd = action.payload;
            const existingItem = state.items.find(item => item.product.id === productToAdd.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: productToAdd, quantity: 1 });
            }

            // Save cart state to localStorage
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;

            const existingItem = state.items.find(item => item.product.id === productIdToRemove)

            if (existingItem?.quantity===1) {
                state.items = state.items.filter(item => item.product.id !== productIdToRemove);
            }else if(existingItem){
                existingItem.quantity -= 1;
            }


            // Save cart state to localStorage
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        deletefromCart: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;
            const existingItem = state.items.find(item => item.product.id === productIdToRemove)
            if(existingItem)
                state.items = state.items.filter(item => item.product.id !== productIdToRemove);
         
            // Save cart state to localStorage
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, deletefromCart } = cartSlice.actions;
export default cartSlice.reducer;