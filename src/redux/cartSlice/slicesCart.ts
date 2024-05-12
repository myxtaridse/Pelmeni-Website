import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/getCartItemFromLS";
import { priceValue } from "../../utils/priceValue";
import { CartItem, CartSliceState } from "./typeCarts";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

// const priceValue = (items: CartItem[]) => {
//   items.reduce((sum, obj) => {
//     return obj.price + sum;
//   }, 0);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addCartValue(state, action) {
    //   state.items.push(action.payload);
    //   //прибавление стоимости добавленного продукта, к уже существующей сумме остальных добавленных продуктов
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },

    addCartValue(state, action: PayloadAction<CartItem>) {
      //если добавляется один и тот же продукт несколько раз, чтобы не создавался отдельный объект, просто добавим кол-во
      //count

      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.sizes === action.payload.sizes &&
          obj.types === action.payload.types
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = priceValue(state.items);
    },
    minusItemValue(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem && findItem.count--;
      // findItem && findItem.count > 1
      //   ? findItem.count--
      //   : functionRemove(state, action);
      state.totalPrice = priceValue(state.items);
    },
    removeCartValue(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = priceValue(state.items);
    },
    clearCartValue(state) {
      try {
        state.items = [];
        state.totalPrice = 0;
      } catch (err) {
        //console.log(err);
      }
    },
  },
});

export const { addCartValue, minusItemValue, removeCartValue, clearCartValue } =
  cartSlice.actions;

export default cartSlice.reducer;
