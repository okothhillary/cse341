const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const { validateBook } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");


router.get(
  "/",
  booksController.getAll
);


router.get(
  "/:id",  
  booksController.getSingle
);


router.post(
  "/",
  isAuthenticated, validateBook,
  booksController.createBook
);


router.put(
  "/:id",
  isAuthenticated, validateBook,
  booksController.updateBook
);


router.delete(
  "/:id",
  isAuthenticated,
  booksController.deleteBook
);

module.exports = router;
