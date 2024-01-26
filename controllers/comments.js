const commentsModel = require("../models/comments");
const { parseIncomingBodyData } = require("../utils");

async function addComment(req, res) {
    try {
        const { blogId, comment } = await parseIncomingBodyData(req);
        if (blogId && comment) {
            await commentsModel.addCommentsToBlog(blogId, comment);
            res.writeHead(200).end("comment added successfully");
        } else {
            res.writeHead(404).end("blog not found");
        }

    } catch (error) {
        console.log("Error adding comment", error);
        res.writeHead(500).end("internal server error");
    }
}

async function removeComment(req, res) {
    try {
        const { commentId, comment } = await parseIncomingBodyData(req);
        if (commentId && comment) {
            await commentsModel.removeCommentsFromBlog(commentId, comment);
            res.writeHead(200).end("comment removed successfully");
        } else {
            res.writeHead(404).end("blog not found");
        }

    } catch (error) {
        console.log("Error adding comment", error);
        res.writeHead(500).end("internal server error");
    }
}

async function updateComment(req, res) {
    try {
        const { commentId, updatedComment } = await parseIncomingBodyData(req);
        await commentsModel.updateCommentsOfBlog(commentId, updatedComment);
        res.writeHead(200).end("Comment updated successfully");
    } catch (error) {
        console.log("Error updating comment", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

module.exports = {
    addComment, removeComment, updateComment
}