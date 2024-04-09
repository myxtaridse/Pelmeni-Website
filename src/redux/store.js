import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import itemsSlice from "./slices/itemsSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  //store - Redux-хранилище, здесь хранится вся логика, связанная с Redux Toolkit
  reducer: {
    //хранилище, выполняет действие
    filterSlice, //counter - переменная, как св-во в объекте, содержит в себе ключ, значение - всю логику из filterSlice
    //здесь может быть много хранилищ - выше - counter - одно из, их может быть много
    // counter писать не обязательно, если просто написать filterSlice
    //тогда оно просто также назовается, значит filterSlice: filterSlice == filterSlice просто так написать
    //название св-ва будет таким же как название ключа, значения filterSlice
    itemsSlice,
    cartSlice,
  },
});
