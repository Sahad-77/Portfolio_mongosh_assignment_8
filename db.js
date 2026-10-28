// db.js

require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "portfolio";

const client = new MongoClient(uri);

let database;

// Connect to MongoDB
async function connectDB() {
    if (database) {
        return database;
    }

    await client.connect();

    database = client.db(dbName);

    await database.command({ ping: 1 });

    console.log(`Connected to MongoDB database: ${dbName}`);

    return database;
}

// Get database connection
function getDB() {
    if (!database) {
        throw new Error(
            "Database is not connected. Call connectDB() first."
        );
    }

    return database;
}

// Close database connection
async function closeDB() {
    await client.close();
    database = undefined;

    console.log("MongoDB connection closed.");
}

module.exports = {
    connectDB,
    getDB,
    closeDB
};