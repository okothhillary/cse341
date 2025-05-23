const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll); // GET /contacts
router.get("/:id", contactsController.getSingle); // GET /contacts/:id
router.post("/", validation.saveContact, contactsController.createContact); // POST /contacts
router.put("/:id", validation.saveContact, contactsController.updateContact); // PUT /contacts/:id
router.delete("/:id", contactsController.deleteContact); // DELETE /contacts/:id

module.exports = router;
