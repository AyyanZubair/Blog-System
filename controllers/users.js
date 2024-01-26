const { parseIncomingBodyData } = require("../utils");
const userModel = require("../models/users");

async function create_User(req, res) {
    try {
        const { username, email, password } = await parseIncomingBodyData(req);
        const existingUser = await userModel.getUser({ email });
        if (existingUser) {
            res.writeHead(200).end("user already exist");
        } else if (username && email && password) {
            await userModel.createUser({ username, email, password });
            res.writeHead(201).end("user created successfully!");
        } else {
            res.writeHead(400).end("Please fill all requirements...");
        }

    } catch (error) {
        console.log("error creating user", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

async function login_User(req, res) {
    try {
        const { email, password } = await parseIncomingBodyData(req);
        if (email && password) {
            const userExist = await userModel.loginUser({ email, password });
            if (userExist) {
                res.writeHead(200).end("you logged in successfully");
            } else {
                res.writeHead(400).end("account not exist... please signup first");
            }
        } else {
            res.writeHead(400).end("email & password is required");
        }
    } catch (error) {
        console.log("error user created", error);
        res.writeHead(500).end("Internal Server Error");
    }
}

module.exports = {
    create_User, login_User
}



