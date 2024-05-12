import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ItemsPropsSlice, Status } from "./typeItems";
import { fetchProducts } from "./asyncActions";

const initialState: ItemsPropsSlice = {
  items: [],
  webStatus: Status.LOADING,
};

const itemsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ItemsPropsSlice>) {
      state.items = action.payload.items;
    },

    // setIsLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // передается логика для асинхронных запросов, ключей
    builder.addCase(fetchProducts.pending, (state) => {
      //когда идет запрос
      //console.log("loading");
      state.webStatus = Status.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      //пришел запрос
      //console.log(state, "okey");
      state.items = action.payload;
      state.webStatus = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      //при ошибке
      //console.log("error");
      state.webStatus = Status.ERROR;
    });
  },
});

//export const { setIsLoading } = itemsSlice.actions;

export default itemsSlice.reducer;
