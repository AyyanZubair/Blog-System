const { ObjectId } = require("bson");
const blogModel = require("../models/blog");
const { parseIncomingBodyData } = require("../utils");

async function createBlog(req, res) {
    try {
        const { user_id, blogTitle, blogContent, likes, comments } = await parseIncomingBodyData(req);
        if (blogTitle && blogContent) {
            await blogModel.createBlog(user_id, blogTitle, blogContent, likes, comments);
            res.writeHead(201).end("blog created successfully!");
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
        if (existingBlog) {
            await blogModel.deleteBlog(blogId);
            res.writeHead(200).end("blog deleted successfully!");
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

        if (existingBlog) {
            await blogModel.updateBlog(
                { _id: existingBlog._id },
                { $set: { blogTitle: updatedTitle, blogContent: updatedContent } }
            );
            res.writeHead(200).end("Blog updated successfully");
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
        const blogs = await blogModel.findAllBlogs();

        if (!blogs) {
            res.writeHead(404).end("No blogs found");
        } else {
            res.writeHead(200).end(JSON.stringify({ blogs }));

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