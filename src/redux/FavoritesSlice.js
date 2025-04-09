import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem("favorites");
    return serializedFavorites === null ? [] : JSON.parse(serializedFavorites);
  } catch (err) {
    console.error("error in getting favourites", err);
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem("favorites", serializedFavorites);
  } catch (err) {
    console.error("Error saving favorites to local storage:", err);
  }
};

const initialState = {
  items: loadFavorites(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.find((item) => item.key === action.payload.key)) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
