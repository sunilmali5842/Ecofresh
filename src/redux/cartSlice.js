import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem("cart")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existingItem = state.items.find(
                cartItem => cartItem.id === item.id
            )

            if (existingItem) {
                existingItem.quantity += item.quantity
            } else {
                state.items.push(item)
            }

        },
        removeFromCart: (state, action) => {
            // state.items.splice(action.payload,1)
            state.items = state.items.filter(
                item => item.id !== action.payload
            )
        },
        increaseQuantity: (state, action) =>{
            const id = action.payload

            const existingItem = state.items.find(
                cartItem => cartItem.id === id
            )

            if(existingItem) {
                existingItem.quantity += 1
            }
        },
        decreaseQuantity: (state, action) =>{
            const id = action.payload

            const existingItem = state.items.find(
                cartItem => cartItem.id === id
            )

            if(existingItem.quantity>1) {
                existingItem.quantity -= 1
            }
        },
        clearCart: (state, action) => {
            state.items.length = 0;
        },
    },
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer