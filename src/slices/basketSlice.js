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
      const index = state.items.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );

      let newBasket = [...state.items];
      ///if match found, remove item
      if (index >= 0) {
        //item exist
        console.log("index is ", index, " - Remove -- ", newBasket[index]);
        newBasket.splice(index, 1);
      } else {
        console.warn("Item does not exist");
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const basketTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
