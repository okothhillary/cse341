const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all books
const getAll = async (req, res) => {
  //#swagger.tags=['books']
  const result = await mongodb.getDatabase().db().collection("books").find();
  result.toArray().then((books) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  });
};

// GET one book by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['books']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid book ID");
  }

  const bookId = ObjectId.createFromHexString(id);
  const result = await mongodb.getDatabase().db().collection("books").find({ _id: bookId });

  result.toArray().then((books) => {
    if (books.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books[0]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
};

// POST (create) book
const createBook = async (req, res) => {
  //#swagger.tags=['books']
  const { title, author, publishedYear, genre, isbn, language, pages } = req.body;

  if (!title || !author || !publishedYear || !genre || !isbn || !language || !pages) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newBook = { title, author, publishedYear, genre, isbn, language, pages };

  try {
    const result = await mongodb.getDatabase().db().collection("books").insertOne(newBook);
    if (result.acknowledged) {
      return res.status(201).json({ message: "Book created", id: result.insertedId });
    } else {
      return res.status(500).json({ message: "Failed to create book" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PUT (update) book
const updateBook = async (req, res) => {
  //#swagger.tags=['books']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  const bookId = ObjectId.createFromHexString(id);
  const { title, author, publishedYear, genre, isbn, language, pages } = req.body;

  if (!title || !author || !publishedYear || !genre || !isbn || !language || !pages) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const updatedBook = { title, author, publishedYear, genre, isbn, language, pages };

  try {
    const result = await mongodb.getDatabase().db().collection("books").replaceOne({ _id: bookId }, updatedBook);
    if (result.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Book not found or not modified" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  //#swagger.tags=['books']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  const bookId = ObjectId.createFromHexString(id);

  try {
    const result = await mongodb.getDatabase().db().collection("books").deleteOne({ _id: bookId });
    if (result.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
};
