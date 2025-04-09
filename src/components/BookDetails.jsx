import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Container, Box, Button, Chip } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

import { fetchBookDetails, clearSelectedBook } from "../redux/BookSlice";

const BookDetails = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector((state) => state.books.selectedBook);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBookDetails(bookId));
    return () => {
      dispatch(clearSelectedBook());
    };
  }, [dispatch, bookId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Typography color="error">Error loading book details: {error}</Typography>
    );
  }

  if (!book) {
    return <Typography>No book details found.</Typography>;
  }

  const coverUrl =
    book.covers && book.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Search Results
      </Button>
      <Box sx={{ display: "flex", gap: 3 }}>
        {coverUrl && (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            style={{ maxWidth: 200, height: "auto" }}
          />
        )}
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            {book.title}
          </Typography>
          {book.authors && book.authors.length > 0 && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              by {book.authors.map((author) => author.author.name).join(", ")}
            </Typography>
          )}
          {book.first_publish_date && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              First Published: {book.first_publish_date}
            </Typography>
          )}
          {book.description && (
            <Typography variant="body1" paragraph>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </Typography>
          )}
          {book.subjects && book.subjects.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Subjects:</Typography>
              {book.subjects.map((subject, index) => (
                <Chip key={index} label={subject} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BookDetails;
