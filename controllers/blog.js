const { ObjectId } = require("bson");
const blogModel = require("../models/blog");
const { parseIncomingBodyData } = require("../utils");
const { getUser } = require("../service/auth");

async function createBlog(req, res) {
    try {
        const { user_id, blogTitle, blogContent, likes, comments } = await parseIncomingBodyData(req);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (blogTitle && blogContent) {
            if (verify_Token) {
                await blogModel.createBlog(user_id, blogTitle, blogContent, likes, comments);
                res.writeHead(201).end("blog created successfully!");
            } else {
                res.writeHead(400).end("invalid token! Blog not created");
            }

        } else {
            res.writeHead(400).end("Please give all requirments....");
        }
    } catch (error) {
        console.log("error creating blog", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function deleteBlog(req, res) {
    try {
        const urlParts = req.url.split("/");
        const blogId = urlParts[2];
        const existingBlog = await blogModel.getBlogByTitle(blogId);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (existingBlog) {
            if (verify_Token) {
                await blogModel.deleteBlog(blogId);
                res.writeHead(200).end("blog deleted successfully!");
            } else {
                res.writeHead(400).end("invalid token! Blog not deleted");
            }
        } else {
            res.writeHead(400).end("blog which you wants to deleted is not existed!");
        }
    } catch (error) {
        console.log("error deleted blog", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function updateBlog(req, res) {
    try {
        const urlParts = req.url.split("/");
        const blogId = urlParts[2];
        const { updatedTitle, updatedContent } = await parseIncomingBodyData(req);
        const existingBlog = await blogModel.getBlogById(blogId);
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        const verify_Token = getUser(token);
        if (existingBlog) {
            if (verify_Token) {
                await blogModel.updateBlog(
                    { _id: existingBlog._id },
                    { $set: { blogTitle: updatedTitle, blogContent: updatedContent } }
                );
                res.writeHead(200).end("Blog updated successfully");
            } else {
                res.writeHead("invalid token! Blog not updated")
            }
        } else {
            res.writeHead(400).end("Blog not updated");
        }
    } catch (error) {
        console.log("error updating blog", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function listBlog(req, res) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.writeHead(400).end("token not found");
        }
        const token = authHeader.split("Bearer ")[1];
        console.log("token", token);
        const verify_Token = await getUser(token);
        console.log("verify_Token", verify_Token);
        if (verify_Token && verify_Token.userRole === "ADMIN") {
            const blogs = await blogModel.findAllBlogs();
            res.writeHead(200).end(JSON.stringify({ blogs }));
        } else {
            res.writeHead(403).end("unAuthorized access");
        }
    } catch (error) {
        console.error("Error fetching blogList", error);
        res.writeHead(500).end("Internal Server Error");;

    }
}

module.exports = {
    createBlog,
    deleteBlog,
    updateBlog,
    listBlog
}