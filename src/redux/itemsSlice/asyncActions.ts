import { createAsyncThunk } from "@reduxjs/toolkit";
import { ItemsProps, ProductsProps } from "./typeItems";
import Axios from "axios";

//создание асинхронного элемента
export const fetchProducts = createAsyncThunk<
  ItemsProps[], // возвращаемые данные
  ProductsProps // входящие данные
>(
  "products/fetchProductsStatus",
  //async ({ currentPage, category, sort, sortOrder, search }: Record<string, string>) => {
  async ({ currentPage, category, sortBy, sortOrder, search }) => {
    const { data } = await Axios.get<ItemsProps[]>(
      `https://66028e549d7276a755538691.mockapi.io/items?${search}&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrder}`
    );
    if (search) {
      const { data } = await Axios.get<ItemsProps[]>(
        `https://66028e549d7276a755538691.mockapi.io/items?${search}`
      );
      return data;
    }

    // console.log(thunkApi);

    return data;
    // return data as CartItem[];
  }
);
