const { ObjectId } = require("bson");

async function createBlog(req, BlogTitle, BlogContent, imagePath, blogSlug) {
    await req.dbClient.db("blog_app").collection("blogs").insertOne({ BlogTitle, BlogContent, imagePath, blogSlug });
}

async function getBlogByTitle(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").findOne({ blogId })
}

async function deleteBlog(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").deleteOne({ _id: new ObjectId(blogId) })
}

async function getBlogById(req, blogId) {
    return await req.dbClient.db("blog_app").collection("blogs").findOne({ _id: new ObjectId(blogId) })
}

async function updateBlog(req, query, update) {
    return await req.dbClient.db("blog_app").collection("blogs").updateOne(query, update);
}

async function findAllBlogs(req) {
    return req.dbClient.db("blog_app").collection("blogs").find({}).toArray();
}

module.exports = {
    createBlog,
    getBlogByTitle,
    deleteBlog,
    getBlogById,
    updateBlog,
    findAllBlogs,
}