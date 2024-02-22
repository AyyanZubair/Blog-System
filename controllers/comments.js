const commentsModel = require("../models/comments");
const { parseIncomingBodyData } = require("../utils");
const { getUser } = require("../service/auth");

async function addComment(req, res) {
    try {
        const { blogId, comment } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (blogId && comment) {
            if (verify_Token) {
                await commentsModel.addCommentsToBlog(req, blogId, comment);
                res.writeHead(200).end("comment added successfully");
            }
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
        const { commentId } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (commentId) {
            if (verify_Token) {
                await commentsModel.removeCommentsFromBlog(req, commentId);
                res.writeHead(200).end("comment removed successfully");
            } else {
                res.writeHead(400).end("invalid token");
            }
        }
        else {
            res.writeHead(400).end("comment not found...");
        }
    } catch (error) {
    console.log("Error adding comment", error);
    res.writeHead(500).end("internal server error");
}
}

async function updateComment(req, res) {
    try {
        const { commentId, updatedComment } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (commentId && updateComment) {
            if (verify_Token) {
                await commentsModel.updateCommentsOfBlog(req, commentId, updatedComment);
                res.writeHead(200).end("Comment updated successfully");
            } else {
                res.writeHead(400).end("invalid token! Comment not updated");
            }
        } else {
            res.writeHead(400).end("commentId & updateComment is required...");
        }
    } catch (error) {
        console.log("Error updating comment", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

module.exports = {
    addComment, removeComment, updateComment
}