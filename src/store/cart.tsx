import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types'

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}


const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
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
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;

            const existingItem = state.items.find(item => item.product.id == productIdToRemove)

            if (existingItem?.quantity===1) {
                state.items = state.items.filter(item => item.product.id !== productIdToRemove);
            }else if(existingItem){
                existingItem.quantity -= 1;
            }


            // Save cart state to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;