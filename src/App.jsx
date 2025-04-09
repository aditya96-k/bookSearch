import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookDetails from "./components/BookDetails";
import FavoritesList from "./components/FavoritesList";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const searchResults = useSelector((state) => state.books.searchResults);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "90vw",
        margin: "auto",
      }}
    >
      <AppBar
        position="static"
        sx={{
          mb: 3,
          width: { xs: "100%" },
          mx: "auto",
          top: 0,
          paddingY: 2,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Search
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Search
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <Box>
              <SearchBar />
              {loading && <LoadingSpinner />}
              {error && <Typography color="error">Error: {error}</Typography>}
              {!loading && searchResults.length === 0 && !error && (
                <Typography>
                  No books found. Please enter a search term.
                </Typography>
              )}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 3,
                }}
              >
                {searchResults.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </Box>
            </Box>
          }
        />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </Box>
  );
}

export default App;
