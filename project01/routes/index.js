const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['May Node be with you!']
  res.send("May Node be with you!");
});

router.use("/contacts", require("./contacts"));

module.exports = router;
