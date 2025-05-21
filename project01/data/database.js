//1. Module imports and configuration.
const dotenv = require('dotenv');// //importing dotenv to load environment variables from a .env file
dotenv.config();// //load environment variables from .env file
//dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const MongoClient = require('mongodb').MongoClient;//importing MongoClient from mongodb package to connect to MongoDB database

//2. Database connection handling.
let database; //private variable to store the database client instance once connected.

//3. Initialise the database connection.
const initDb = (callback) => { // function to initialise the database connection
    if (database) {
        console.log('Database is already initialised!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)//if not connected, connect to the database using the connection string from the environment variables.
        .then((client) => {//create a new MongoClient instance and connect to the database.
            database = client; //store the connected client instance in the database variable.
            callback(null, database);//
        })
        .catch((err) => {
            console.error('Failed to connect to the database:', err);
            callback(err);
        });
};

//4. Accessing the database instance.
const getDatabase = () => {
    if (!database) {
        throw new Error('Database is not initialised!');
    }
        return database;
}

module.exports = {//5. exporting the functions to be used in other modules.
    initDb, 
    getDatabase,
};