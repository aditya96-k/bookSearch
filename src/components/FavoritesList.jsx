import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFavorite } from "../redux/FavoritesSlice";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <Typography variant="subtitle1" color="text.secondary">
        Your favorites list is empty.
      </Typography>
    );
  }

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        My Favorite Books
      </Typography>
      <List>
        {favorites.map((book) => (
          <ListItem
            key={book.key}
            secondaryAction={
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeFavorite(book.key))}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            }
          >
            <ListItemText
              primary={book.title}
              secondary={
                book.author_name ? `by ${book.author_name.join(", ")}` : ""
              }
            />
            <Button
              size="small"
              component={Link}
              to={`/book/${book.key.replace("/works/", "")}`}
            >
              View
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesList;
