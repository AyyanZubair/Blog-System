const { parseIncomingBodyData } = require("../utils");
const userModel = require("../models/users");
const { generateToken, getUser } = require("../service/auth");

async function create_User(req, res) {
    try {
        const { username, email, password } = await parseIncomingBodyData(req);
        const existingUser = await userModel.getUser({ email });
        if (existingUser) {
            res.writeHead(200).end("user already exist");
        } else if (username && email && password) {
            await userModel.createUser(username, email, password);
            const token = await generateToken({ email, password });
            res.writeHead(201).end(`user created successfully!, your token is ${token}`);
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
                const authHeader = req.headers["authorization"];
                const token = authHeader.split("Bearer ")[1];
                if (!token) return res.writeHead(400).end("token not found");
                const verify_Token = getUser(token);
                if (verify_Token) {
                    res.writeHead(200).end("token verified you logged in successfully")
                } else {
                    res.writeHead(400).end("invalid token");
                }
            } else {
                res.writeHead(400).end("account not exist! please signup first");
            }
        }
    } catch (error) {
        console.log("Error generating token", error);
        res.writeHead(500).end(JSON.stringify({ error: "Internal Server Error" }));
    }
}


module.exports = {
    create_User, login_User
}



