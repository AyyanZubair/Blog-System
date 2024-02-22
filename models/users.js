async function createUser(req, username, email, Password, userSlug) {
    req.dbClient.db("blog_app").collection("users").insertOne({ username, email, Password, userSlug });
}

async function loginUser(req, email) {
    return await req.dbClient.db("blog_app").collection("users").findOne({ email })

}

async function getUser(req, email) {
    return req.dbClient.db("blog_app").collection("users").findOne({ email });
}

module.exports = {
    createUser, loginUser, getUser
}