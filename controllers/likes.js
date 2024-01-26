const blogModel = require("../models/blog");
const likesModel = require("../models/likes");
const { parseIncomingBodyData } = require("../utils");

async function addLike(req, res) {
    try {
        const { blogId, userId } = await parseIncomingBodyData(req);
        if (blogId && userId) {
            const existingBlog = await likesModel.checkUserLikedTheBlog(blogId,userId);
            if (!existingBlog) {
                await likesModel.addLikesToBlog(blogId, userId);
                res.writeHead(200).end("Like added successfully");
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
        if (blogId && userId) {
            await likesModel.removeLikesFromBlog(blogId, userId);
            res.writeHead(200).end("Like removed successfully");
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
        const count = await likesModel.totalLikesOfBlog(blogId);
        res.writeHead(200).end(`Total Likes:${count}`);
    } catch (error) {
        console.log("error getting total likes", error);
        res.writeHead(500).end("internal server error");
    }
}

module.exports = {
    addLike, removeLike, totalLikes
}