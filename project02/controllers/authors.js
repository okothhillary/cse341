const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all authors
const getAll = async (req, res) => {
  //#swagger.tags=['authors']
  try {
    const result = await mongodb.getDatabase().db().collection("authors").find();
    const authors = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one author by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['authors']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid author ID");
  }

  try {
    const authorId = ObjectId.fromHexString(id);
    const result = await mongodb.getDatabase().db().collection("authors").find({ _id: authorId });
    const authors = await result.toArray();

    if (authors.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(authors[0]);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST author
const createAuthor = async (req, res) => {
  //#swagger.tags=['authors']
  const { firstName, lastName, birthYear, nationality, genre, notableWorks, awards } = req.body;

  if (!firstName || !lastName || !birthYear || !nationality || !genre || !Array.isArray(notableWorks) || !Array.isArray(awards)) {
    return res.status(400).json({ message: "All fields are required and notableWorks, awards must be arrays." });
  }

  const newAuthor = {
    firstName,
    lastName,
    birthYear,
    nationality,
    genre,
    notableWorks,
    awards,
  };

  try {
    const result = await mongodb.getDatabase().db().collection("authors").insertOne(newAuthor);
    if (result.acknowledged) {
      return res.status(201).json({ message: "Author created", id: result.insertedId });
    } else {
      return res.status(500).json({ message: "Failed to create author" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PUT author
const updateAuthor = async (req, res) => {
  //#swagger.tags=['authors']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  const { firstName, lastName, birthYear, nationality, genre, notableWorks, awards } = req.body;

  if (!firstName || !lastName || !birthYear || !nationality || !genre || !Array.isArray(notableWorks) || !Array.isArray(awards)) {
    return res.status(400).json({ message: "All fields are required and notableWorks, awards must be arrays." });
  }

  const updatedAuthor = {
    firstName,
    lastName,
    birthYear,
    nationality,
    genre,
    notableWorks,
    awards,
  };

  try {
    const authorId = ObjectId.fromHexString(id);
    const result = await mongodb.getDatabase().db().collection("authors").replaceOne({ _id: authorId }, updatedAuthor);
    if (result.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Author not found or not modified" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE author
const deleteAuthor = async (req, res) => {
  //#swagger.tags=['authors']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid author ID" });
  }

  try {
    const authorId = ObjectId.fromHexString(id);
    const result = await mongodb.getDatabase().db().collection("authors").deleteOne({ _id: authorId });
    if (result.deletedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
