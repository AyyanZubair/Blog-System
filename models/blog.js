const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.Database_Password);

async function createBlog(user_id, blogTitle, blogContent, likes, comments) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    const parsedLikes = parseInt(likes);
    const defaultLikes = 0;
    const defaultComments = [];
    await blogCollection.insertOne({
        user_id,
        blogTitle,
        blogContent,
        likes: isNaN(parsedLikes) ? defaultLikes : parsedLikes,
        userIds: [],
        comments: Array.isArray(comments) ? comments : defaultComments
    });
}

async function getBlogByTitle(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    return blogCollection.findOne({ _id: new ObjectId(blogId) });
}

async function deleteBlog(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    await blogCollection.deleteOne({ _id: new ObjectId(blogId) });

}

async function getBlogById(blogId) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    return await blogCollection.findOne({ _id: new ObjectId(blogId) });
}


async function updateBlog(query, update) {
    const db = client.db('blog_app');
    const blogCollection = db.collection('blogs');
    await blogCollection.updateOne(query, update);
}

async function findAllBlogs() {
    const db = client.db("blog_app");
    const blogCollection = db.collection("blogs");
    const blogList = await blogCollection.find({}).toArray();
    return blogList;
}

module.exports = {
    createBlog,
    getBlogByTitle,
    deleteBlog,
    getBlogById,
    updateBlog,
    findAllBlogs,
}