import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterProps, SortPropertyProps, SortProps } from "./typeFilter";

const initialState: FilterProps = {
  categoryId: 0,
  isSearch: "",
  currentPage: 1,
  sort: {
    name: "популярности", //начальные значения
    sortProperty: SortPropertyProps.RATING_DESC,
  },
};

const filterSlice = createSlice({
  //позволит создать логику для обработки данных State
  name: "filters", //просто название Slice
  initialState,
  //для хранение сортировки и фильтрации - actions
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      //функция получает состояние и действие
      //console.log(action.payload); //payload - внимает в себя ID категории
      state.categoryId = action.payload; //метод, который меняет категорию
    },
    setSortType(state, action: PayloadAction<SortProps>) {
      //функция получает состояние и действие
      state.sort = action.payload; //метод, который меняет категорию
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterProps>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort.sortProperty = action.payload.sort.sortProperty;
    },
    setIsSearch(state, action: PayloadAction<string>) {
      state.isSearch = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilter,
  setIsSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
