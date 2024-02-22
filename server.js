const http = require("http");
const users = require("./controllers/users");
const blog = require("./controllers/blog");
const likes = require("./controllers/likes");
const comments = require("./controllers/comments");
<<<<<<< HEAD
const { connectToDatabase } = require("./configs/dbConnection.js");
const url = require("url");

var client;

const httpServer = http.createServer(async (req, res) => {
    const parsedURL = url.parse(req.url, true);
    // console.log(parsedURL);
    const pathname = parsedURL.pathname;
    const urlParts = pathname.split("/");
    const resourse = urlParts[1];
    req.dbClient = client
=======
PORT = 3001;

const httpServer = http.createServer(async (req, res) => {
    const urlParts = req.url.split("/");
    const resourse = urlParts[1];
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
    switch (resourse) {
        case "signup": {
            if (req.method === "POST") {
                users.create_User(req, res);
            }
        }
            break;

        case "login": {
            if (req.method === "POST") {
                users.login_User(req, res);
            }
        }
            break;

        case "blogs": {
            if (req.method === "POST" && urlParts[2] === "like") {
                likes.addLike(req, res);
<<<<<<< HEAD
            } else if (req.method === "DELETE" && urlParts[2] === "dislike") {
=======
            } else if (req.method === "DELETE" && urlParts[2] === "like") {
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
                likes.removeLike(req, res);
            } else if (req.method === "POST" && urlParts[2] === "getLikes") {
                likes.totalLikes(req, res);
            } else if (req.method === "POST" && urlParts[2] === "comment") {
                comments.addComment(req, res);
            } else if (req.method === "DELETE" && urlParts[2] === "comment") {
                comments.removeComment(req, res);
            } else if (req.method === "PATCH" && urlParts[2] === "updateComment") {
                comments.updateComment(req, res);
            } else if (req.method === "POST") {
                blog.createBlog(req, res);
            } else if (req.method === "GET") {
                blog.listBlog(req, res);
            } else if (req.method === "DELETE") {
                blog.deleteBlog(req, res);
            } else if (req.method === "PATCH") {
                blog.updateBlog(req, res);
            } else if (req.method === "POST" && urlParts[2] === "comment") {
                blog.addComment(req, res);
            }
        }
            break;

        default: res.end("page not found");
    }
})

<<<<<<< HEAD
connectToDatabase().then((mongoClient) => {
    client = mongoClient
    console.log(`db connected successfully!`);
    httpServer.listen(process.env.PORT, () => console.log(`server started at port: ${process.env.PORT}`));
}).catch((error) => {
    console.log("error:", error);
});

=======
httpServer.listen(PORT, () => console.log(`server started at port: ${PORT}`));
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
