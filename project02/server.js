const express = require("express");
const mongodb = require("./data/database");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigin = 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  })
);

// Passport GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


// Root route
app.get("/", (req, res) => {
  res.send(req.user ? `Logged in as ${req.user.displayName || req.user.username}` : "Logged Out");
});

// GitHub callback route
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    console.log("User authenticated:", req.user);
    res.redirect("/");
  }
);




app.get("/api/whoami", (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Authenticated",
      user: {
        id: req.user.id,
        name: req.user.displayName || req.user.username,
      },
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      withCredentials: true,
    },
  })
);

// Main routes
app.use("/", require("./routes"));

// Connect to MongoDB and start server
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
