import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const functionRemove = (state, action) => {
  if (window.confirm("Вы действительно хотите удалить товар?")) {
    state.items = state.items.filter((obj) => obj.id !== action.payload.id);
  }
};

const priceValue = (state, action) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

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

    addCartValue(state, action) {
      //если добавляется один и тот же продукт несколько раз, чтобы не создавался отдельный объект, просто добавим кол-во
      //count
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      priceValue(state, action);
    },
    minusItemValue(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem && findItem.count > 1
        ? findItem.count--
        : functionRemove(state, action);
      priceValue(state, action);
    },
    removeCartValue(state, action) {
      functionRemove(state, action);
      priceValue(state, action);
    },
    clearCartValue(state) {
      state.items = [];
      priceValue(state);
    },
  },
});

export const { addCartValue, minusItemValue, removeCartValue, clearCartValue } =
  cartSlice.actions;
export default cartSlice.reducer;
