<<<<<<< HEAD
const { ObjectId } = require("bson");

async function createBlog(req, BlogTitle, BlogContent, imagePath, blogSlug) {
    await req.dbClient.db("blog_app").collection("blogs").insertOne({ BlogTitle, BlogContent, imagePath, blogSlug });
}

async function getBlogByTitle(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").findOne({ blogId })
}

async function deleteBlog(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").deleteOne({ _id: new ObjectId(blogId) })
}

async function getBlogById(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").findOne({ _id: new ObjectId(blogId) })
}

async function updateBlog(req, query, update) {
    return await req.dbClient.db("blog_app").collection("blogs").updateOne(query, update);
}

async function findAllBlogs(req) {
    return req.dbClient.db("blog_app").collection("blogs").find({}).toArray();
=======
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.Database_URL);

async function createBlog(user_id, blogTitle, blogContent, likes, comments) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    const parsedLikes = parseInt(likes);
    const defaultLikes = 0;
    const defaultComments = [];
    await blogCollection.insertOne({
        user_id,
        blogTitle,
        blogContent,
        likes: isNaN(parsedLikes) ? defaultLikes : parsedLikes,
        userIds: [],
        comments: Array.isArray(comments) ? comments : defaultComments
    });
}

async function getBlogByTitle(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    return blogCollection.findOne({ _id: new ObjectId(blogId) });
}

async function deleteBlog(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    await blogCollection.deleteOne({ _id: new ObjectId(blogId) });

}

async function getBlogById(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    return await blogCollection.findOne({ _id: new ObjectId(blogId) });
}


async function updateBlog(query, update) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    await blogCollection.updateOne(query, update);
}

async function findAllBlogs() {
    const db = client.db("blog_app");
    const blogCollection = db.collection("blogs");
    const blogList = await blogCollection.find({}).toArray();
    return blogList;
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
}

module.exports = {
    createBlog,
    getBlogByTitle,
    deleteBlog,
    getBlogById,
    updateBlog,
    findAllBlogs,
}