const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authors");
const { validateAuthor } = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", authorsController.getAll);

router.get("/:id", authorsController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validateAuthor,
  authorsController.createAuthor
);

router.put(
  "/:id",
  isAuthenticated,
  validateAuthor,
  authorsController.updateAuthor
);

router.delete("/:id", isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
