import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice/sliceFilter";
import itemsSlice from "./itemsSlice/sliceItems";
import cartSlice from "./cartSlice/slicesCart";
import { useDispatch } from "react-redux";

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

// Для типизации RTK
// RootState - глобальный стейт для хранения типизации остальных стейтов
// В каждом Слайс мы передали данный глобальный тип для кажого стейта
export type RootState = ReturnType<typeof store.getState>;

// более продвинутый dispatch, который типизированный
// в главный диспатч передаются типы всего хранилища
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
