import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    add: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (!product) {
        state.items.push(action.payload);
      } else {
        alert('Este item já está no carrinho.');
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    clear: (state) => {
      state.items = [];
    }
  },
});

export const { add, remove, open, close, clear } = cartSlice.actions;
export default cartSlice.reducer;