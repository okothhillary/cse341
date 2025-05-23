const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  //#swagger.tags=['contacts']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

// GET one contact by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['contacts']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json("Invalid contact ID" );
  }

  const contactId = ObjectId.createFromHexString(id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId });

  result.toArray().then((contacts) => {
    if (contacts.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  });
};

// POST (create) contact
const createContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newContact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .insertOne(newContact);

    if (result.acknowledged) {
      return res
        .status(201)
        .json({ message: "Contact created", id: result.insertedId });
    } else {
      return res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PUT (update) contact
const updateContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  const contactId = ObjectId.createFromHexString(id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (result.modifiedCount > 0) {
      return res.status(204).send(); // success, no content
    } else {
      return res
        .status(404)
        .json({ message: "Contact not found or not modified" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  const contactId = ObjectId.createFromHexString(id);

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      return res.status(204).send(); // 204 No Content
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
