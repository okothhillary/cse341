const express = require("express");
const router = express.Router();

router.use("/api-docs", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['Welcome']
  res.send("May Node be with the Books & Authors API");
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

module.exports = router;
