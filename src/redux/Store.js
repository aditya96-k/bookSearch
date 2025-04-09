import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../redux/BookSlice";
import favoritesReducer from "../redux/FavoritesSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    favorites: favoritesReducer,
  },
});
