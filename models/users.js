const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://Ayan_Zubair:Alif-99@blogclustor.qupfyps.mongodb.net/");

async function connectToDatabase() {
    await client.connect();
    console.log("mongodb connected!");
}

async function initializeCollections() {
    const db = client.db("blog_app");
    await db.createCollection("users");
    await db.createCollection("blogs");
}

async function createUser(username, email, password) {
    const db = client.db('blog_app');
    const usersCollection = db.collection('users');
    await usersCollection.insertOne(username, email, password);
}

async function loginUser(email, password) {
    const db = client.db('blog_app');
    const usersCollection = db.collection('users');
    return await usersCollection.findOne(email, password);

}

async function getUser(email) {
    const db = client.db('blog_app');
    const usersCollection = db.collection('users');
    return await usersCollection.findOne(email);
}

connectToDatabase();
initializeCollections();

module.exports = {
    createUser, loginUser, getUser
}