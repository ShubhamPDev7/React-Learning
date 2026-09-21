import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // mutating the state here
    addItem: (state, action) => {
      // vanilla redux(older redux way)
      // const newState = [...state];
      // newState.items.push(action.payload);
      // return newState;

      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: () => {
      // RTK - either Mutate the state or return new state
      // state.items.length = 0;
      return {
        items: [],
      };
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
