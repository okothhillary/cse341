const express = require("express");
const router = express.Router();
const passport = require("passport");


router.use("/api-docs", require("./swagger"));

router.get("/", (req, res) => {
  res.send("May Node be with the Books & Authors API");
});

router.use("/books", require("./books"));
router.use("/authors", require("./authors"));

router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
