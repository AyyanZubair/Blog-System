const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectToDatabase() {
    const client = new MongoClient(process.env.Database_URL);
    return await client.connect();    
}

module.exports = {
    connectToDatabase
}