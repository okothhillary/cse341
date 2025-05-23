const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authors");
const { validateAuthor } = require("../middleware/validate");

router.get(
  "/",
  /* #swagger.tags = ['authors'] */
  /* #swagger.description = 'Get all authors' */
  authorsController.getAll
);

router.get(
  "/:id",
  /* #swagger.tags = ['authors'] */
  /* #swagger.description = 'Get a single author by ID' */
  authorsController.getSingle
);

router.post(
  "/",
  /* #swagger.tags = ['authors'] */
  /* #swagger.description = 'Create a new author' */
  validateAuthor,
  authorsController.createAuthor
);

router.put(
  "/:id",
  /* #swagger.tags = ['authors'] */
  /* #swagger.description = 'Update an author by ID' */
  validateAuthor,
  authorsController.updateAuthor
);

router.delete(
  "/:id",
  /* #swagger.tags = ['authors'] */
  /* #swagger.description = 'Delete an author by ID' */
  authorsController.deleteAuthor
);

module.exports = router;
