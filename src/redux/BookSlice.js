import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org";

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${OPEN_LIBRARY_BASE_URL}/search.json?q=${query}`
      );
      return response.data.docs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${OPEN_LIBRARY_BASE_URL}/works/${bookId}.json`
      );
      const descriptionResponse = await axios.get(
        `${OPEN_LIBRARY_BASE_URL}/works/${bookId}/description.json`
      );
      return { ...response.data, description: descriptionResponse.data.value };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  searchResults: [],
  selectedBook: null,
  loading: false,
  error: null,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedBook = null;
      });
  },
});

export const { clearSearchResults, clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
