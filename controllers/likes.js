const likesModel = require("../models/likes");
const { parseIncomingBodyData } = require("../utils");
const { getUser } = require("../service/auth");

async function addLike(req, res) {
    try {
        const { blogId, userId } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (blogId && userId) {
            const existingBlog = await likesModel.checkUserLikedTheBlog(req, blogId, userId);
            if (!existingBlog) {
                if (verify_Token) {
                    await likesModel.addLikesToBlog(req, blogId, userId);
                    res.writeHead(200).end("Like added successfully");
                } else {
                    res.writeHead(400).end("invalid token! Like not added");
                }
            } else {
                res.writeHead(400).end("Already liked");
            }
        }
    } catch (error) {
        console.log("Error adding like", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function removeLike(req, res) {
    try {
        const { blogId, userId } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (userId) {
            if (verify_Token) {
                await likesModel.removeLikesFromBlog(req, blogId, userId);
                res.writeHead(200).end("Like removed successfully");
            } else {
                res.writeHead(400).end("invalid token! Like not removed");
            }
        } else {
            res.writeHead(400).end("there is no like on the blog");
        }
    } catch (error) {
        console.log("Error removing like", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function totalLikes(req, res) {
    try {
        const { blogId } = await parseIncomingBodyData(req);
        const count = await likesModel.totalLikesOfBlog(req, blogId);
        res.writeHead(200).end(`Total Likes:${count}`);
    } catch (error) {
        console.log("error getting total likes", error);
        res.writeHead(500).end("internal server error");
    }
}

module.exports = {
    addLike, removeLike, totalLikes
}