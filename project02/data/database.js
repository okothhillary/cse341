const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialised!");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database is not initialised!");
  }
  return database;
};

module.exports = {
  getDatabase,
  initDb,
};
