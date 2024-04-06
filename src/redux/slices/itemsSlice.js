import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: true,
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
});

export const { setItems, setIsLoading } = itemsSlice.actions;
export default itemsSlice.reducer;
