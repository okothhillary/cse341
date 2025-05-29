const isAuthenticated = (req, res, next) => {
  console.log("req.user:", req.user); // Confirm user exists
  console.log("isAuthenticated:", req.isAuthenticated?.());

  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "You do not have access." });
  }
  next();
};

module.exports = { isAuthenticated }