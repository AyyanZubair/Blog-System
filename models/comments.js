const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb+srv://Ayan_Zubair:Alif-99@blogclustor.qupfyps.mongodb.net/");

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