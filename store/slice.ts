// slices/productsSlice.ts
import { createSlice, configureStore } from "@reduxjs/toolkit";

interface ProductsState {
  products: any[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: null,
  searchQuery: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

export const { setSelectedCategory, setSearchQuery } = productsSlice.actions;
export const selectedCategory = (state: any) => state.products.selectedCategory;
export const searchQuery = (state: any) => state.products.searchQuery;

export default productsSlice.reducer;
