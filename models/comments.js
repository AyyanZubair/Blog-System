const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.Database_Password);

async function addCommentsToBlog(blogId, comment) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    if (blogId && comment) {
        await blogCollection.insertOne({
            comment,
            createdAt: new Date()
        })
    }
}

async function removeCommentsFromBlog(commentId, comment) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    if (commentId && comment) {
        await blogCollection.deleteOne(
            { _id: new ObjectId(commentId) },
            { writeConcern: { w: "majority" } },
            comment
        )
    }
}

async function updateCommentsOfBlog(commentId, updatedComment) {
    const db = client.db("blog_app");
    const blogCollection = db.collection("blogs");
    if (commentId && updatedComment) {
        await blogCollection.updateOne(
            { _id: new ObjectId(commentId) },
            { $set: { comment: updatedComment, updatedAt: new Date() } }
        )
    }
}

module.exports = {
    addCommentsToBlog, removeCommentsFromBlog, updateCommentsOfBlog
}