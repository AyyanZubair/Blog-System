<<<<<<< HEAD
const { ObjectId } = require("bson");

async function addLikesToBlog(req, blogId, userId) {
    const likesCollection = req.dbClient.db("blog_app").collection("likes")
    const blogCollection = req.dbClient.db("blog_app").collection("blogs")
    if (blogId && userId) {
        const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) })
        if (existingBlog) {
            await likesCollection.findOneAndUpdate(
                { blogId: new ObjectId(blogId) },
=======
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.Database_URL);

async function addLikesToBlog(blogId, userId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    if (blogId && userId) {
        const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId), "userIds": userId });
        if (!existingBlog) {
            await blogCollection.findOneAndUpdate(
                { _id: new ObjectId(blogId) },
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
                {
                    $inc: { "likes": 1 },
                    $push: { "userIds": userId },
                    $set: { "updatedAt": new Date() }
                },
                { upsert: true }
            );
<<<<<<< HEAD
        } else {
            throw new Error("blog you want to like does not exist");
=======
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
        }
    }
}

<<<<<<< HEAD
async function checkUserLikedTheBlog(req, blogId) {
    const existingBlog = req.dbClient.db("blog_app").collection("likes").findOne({ _id: new ObjectId(blogId) });
    return existingBlog;
}

async function removeLikesFromBlog(req, blogId, userId) {
    const blogCollection = req.dbClient.db("blog_app").collection("likes")
    if (blogId && userId) {
        const existingBlog = await blogCollection.findOne({ blogId, "userIds": userId });
        if (existingBlog && existingBlog.likes > 0) {
            return await blogCollection.findOneAndUpdate(
                { blogId },
                {
                    $inc: { "likes": -1 },
                    $pull: { "userIds": userId }
                }
            );
        }
    }
}

async function totalLikesOfBlog(req, blogId) {
    const blog = await req.dbClient.db("blog_app").collection("likes").findOne({ blogId: new ObjectId(blogId)  });
    console.log(blog)
=======
async function checkUserLikedTheBlog(blogId, userId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId), "userIds": userId });
    return existingBlog;
}


async function removeLikesFromBlog(blogId, userId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) });
    if (existingBlog && existingBlog.likes > 0) {
        await blogCollection.findOneAndUpdate(
            { _id: new ObjectId(blogId) },
            {
                $inc: { "likes": -1 },
                $pull: { "userIds": userId }
            }
        );
    }
}

async function totalLikesOfBlog(blogId) {
    const db = client.db("blog_app");
    const blogCollection = db.collection("blogs");
    const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) })
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
    return blog ? (blog.userIds ? blog.userIds.length : 0) : 0;
}

module.exports = {
    addLikesToBlog, removeLikesFromBlog, totalLikesOfBlog, checkUserLikedTheBlog
}

