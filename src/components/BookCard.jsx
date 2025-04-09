import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/FavoritesSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.key === book.key)
  );
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book.key));
    } else {
      dispatch(addFavorite(book));
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {coverUrl && (
        <CardMedia
          component="img"
          height="200"
          image={coverUrl}
          alt={`Cover of ${book.title}`}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3">
          {book.title}
        </Typography>
        {book.author_name && (
          <Typography variant="subtitle2" color="text.secondary">
            by {book.author_name.join(", ")}
          </Typography>
        )}
        {book.first_publish_year && (
          <Typography variant="body2" color="text.secondary">
            First Published: {book.first_publish_year}
          </Typography>
        )}
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Button
          size="small"
          component={Link}
          to={`/book/${book.key.replace("/works/", "")}`} // extracting the book id from the key in api
        >
          View Details
        </Button>
        <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default BookCard;
