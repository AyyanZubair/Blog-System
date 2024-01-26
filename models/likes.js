const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.Database_Password);

async function addLikesToBlog(blogId, userId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    if (blogId && userId) {
        const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId), "userIds": userId });
        if (!existingBlog) {
            await blogCollection.findOneAndUpdate(
                { _id: new ObjectId(blogId) },
                {
                    $inc: { "likes": 1 },
                    $push: { "userIds": userId },
                    $set: { "updatedAt": new Date() }
                },
                { upsert: true }
            );
        }
    }
}

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
    return blog ? (blog.userIds ? blog.userIds.length : 0) : 0;
}

module.exports = {
    addLikesToBlog, removeLikesFromBlog, totalLikesOfBlog, checkUserLikedTheBlog
}

