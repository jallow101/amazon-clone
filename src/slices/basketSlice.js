import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      let index = state.items.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );

      ///if match found, remove item
      if (index >= 0) {
        //item exist
        let newBasket = [...state.items];

        newBasket.splice(index, 1);

        state.items = newBasket;
      } else {
        console.warn("Item does not exist")
      }
      state.items = [...state.items];
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
