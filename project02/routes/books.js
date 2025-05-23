const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");
const { validateBook } = require("../middleware/validate");

/**
 * @route GET /books
 * @tags books
 * @summary Get all books
 */
router.get(
  "/",
  /* #swagger.tags = ['books'] */
  /* #swagger.description = 'Get all books' */
  booksController.getAll
);

/**
 * @route GET /books/{id}
 * @tags books
 * @summary Get a single book by ID
 */
router.get(
  "/:id",
  /* #swagger.tags = ['books'] */
  /* #swagger.description = 'Get a single book by ID' */
  booksController.getSingle
);

/**
 * @route POST /books
 * @tags books
 * @summary Create a new book
 */
router.post(
  "/",
  /* #swagger.tags = ['books'] */
  /* #swagger.description = 'Create a new book' */
  validateBook,
  booksController.createBook
);

/**
 * @route PUT /books/{id}
 * @tags books
 * @summary Update a book by ID
 */
router.put(
  "/:id",
  /* #swagger.tags = ['books'] */
  /* #swagger.description = 'Update a book by ID' */
  validateBook,
  booksController.updateBook
);

/**
 * @route DELETE /books/{id}
 * @tags books
 * @summary Delete a book by ID
 */
router.delete(
  "/:id",
  /* #swagger.tags = ['books'] */
  /* #swagger.description = 'Delete a book by ID' */
  booksController.deleteBook
);

module.exports = router;
