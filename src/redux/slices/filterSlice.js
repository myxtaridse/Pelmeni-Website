// у useState есть свое начальное значение как и у Redux Toolkit

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности", //начальные значения
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  //позволит создать логику для обработки данных State
  name: "filters", //просто название Slice
  initialState,
  //для хранение сортировки и фильтрации - actions
  reducers: {
    setCategoryId(state, action) {
      //функция получает состояние и действие
      console.log(action.payload); //payload - внимает в себя ID категории
      state.categoryId = action.payload; //метод, который меняет категорию
    },
    setSortType(state, action) {
      //функция получает состояние и действие
      state.sort = action.payload; //метод, который меняет категорию
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
