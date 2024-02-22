<<<<<<< HEAD
const { ObjectId } = require("bson");

async function addCommentsToBlog(req, blogId, comment) {
    const commentsCollection = req.dbClient.db("blog_app").collection("comments")
    const blogCollection = req.dbClient.db("blog_app").collection("blogs")
    if (blogId && comment) {
        const existingBlog = await blogCollection.findOne({ _id: new ObjectId(blogId) })
        if (existingBlog) {
            await commentsCollection.insertOne({
                blogId: new ObjectId(blogId),
                comment,
                createdAt: new Date()
            })
        } else {
            throw new Error("blog you want to comment does not exist");
        }
    }
}

async function removeCommentsFromBlog(req, commentId) {
    const commentsCollection = req.dbClient.db("blog_app").collection("comments");
    if (commentId) {
        const commCollection = await commentsCollection.findOne({ _id: new ObjectId(commentId) })
        if (commCollection) {
            return await commentsCollection.deleteOne(
                { _id: new ObjectId(commentId) },
                { writeConcern: { w: "majority" } },
            )
        } else {
            throw new Error("comment you want to delete does not exist")
        }

    }
}

async function updateCommentsOfBlog(req, commentId, updatedComment) {
    const commentsCollection = req.dbClient.db("blog_app").collection("comments");
    if (commentId && updatedComment) {
        const commCollection = await commentsCollection.findOne({ _id: new ObjectId(commentId) })
        if(commCollection){
            return result = await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $set: { comment: updatedComment, updatedAt: new Date() } }
            );
        } else {
            throw new Error("comment you want to update does not exist")
        }    
    } 
=======
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.Database_URL);

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
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
}

module.exports = {
    addCommentsToBlog, removeCommentsFromBlog, updateCommentsOfBlog
}