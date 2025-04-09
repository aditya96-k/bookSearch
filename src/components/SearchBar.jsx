import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import { searchBooks, clearSearchResults } from "../redux/BookSlice";
import useDebounce from "../hooks/UseDebounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce((query) => {
    if (query) {
      dispatch(searchBooks(query));
    } else {
      dispatch(clearSearchResults());
    }
  }, 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        label="Search by Title"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button onClick={() => dispatch(clearSearchResults())}>Clear</Button>
    </Box>
  );
};

export default SearchBar;
