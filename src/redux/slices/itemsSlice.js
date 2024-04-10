import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

//создание асинхронного элемента
export const fetchProducts = createAsyncThunk(
  "products/fetchProductsStatus",
  async ({ currentPage, category, sort, sortOrder, search }) => {
    const response = await Axios.get(
      `https://66028e549d7276a755538691.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${sortOrder}&${search}`
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  webStatus: "",
};

const itemsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // передается логика для асинхронных запросов, ключей
    builder.addCase(fetchProducts.pending, (state, action) => {
      //когда идет запрос
      console.log("loading");
      state.webStatus = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      //пришел запрос
      console.log(state, "okey");
      state.items = action.payload;
      state.webStatus = "success";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      //при ошибке
      console.log("error");
      state.webStatus = "error";
    });
  },
});
export const { setIsLoading } = itemsSlice.actions;
export default itemsSlice.reducer;
