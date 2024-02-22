const { parseIncomingBodyData } = require("../utils");
const userModel = require("../models/users");
<<<<<<< HEAD
const { generateToken } = require("../service/auth");
const bcrypt = require("bcrypt");
const { ApiResponse } = require("../ApiResponse");
const slugify = require("slugify");
=======
const { generateToken, getUser } = require("../service/auth");
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84

async function create_User(req, res) {
    try {
        const { username, email, password } = await parseIncomingBodyData(req);
<<<<<<< HEAD
        const existingUser = await userModel.getUser(req, email);
        if (existingUser) {
            res.writeHead(400).end("User already exists");
        } else if (username && email && password) {
            const Password = await bcrypt.hash(password, 10);
            const userSlug = slugify(username);
            await userModel.createUser(req, username, email, Password, userSlug);
            const user_id = 12345;
            const token = await generateToken(user_id, email, Password);
            const apiResponse = new ApiResponse(200, token, "You logged in successfully");
            const metaTitle = "Welcome!";
            const metaDescription = "Thank you for Signing up"
            const responseBody = JSON.stringify({ ...apiResponse, userSlug, metaTitle, metaDescription });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(responseBody);
        } else {
            res.writeHead(400).end("Please fill all requirements...");
        }
    } catch (error) {
        console.log("Error creating user", error);
=======
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
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
        res.writeHead(500).end("Internal Server Error");
    }
}

async function login_User(req, res) {
    try {
        const { email, password } = await parseIncomingBodyData(req);
        if (email && password) {
<<<<<<< HEAD
            const userExist = await userModel.loginUser(req, email);
            if (userExist) {
                const hashPasswordFromDb = userExist.Password;
                const verifyPassword = await bcrypt.compare(password, hashPasswordFromDb);
                if (verifyPassword) {
                    const user_id = 12345;
                    const token = await generateToken(user_id, email, password);
                    if (token) {
                        res.writeHead(201).end(`you logged in successfully, here is your token:${token}`)
                    } else {
                        res.writeHead(400).end("token not found");
                    }
                } else {
                    res.writeHead(400).end("password is Incorrect...");
                }

=======
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
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
            } else {
                res.writeHead(400).end("account not exist! please signup first");
            }
        }
    } catch (error) {
        console.log("Error generating token", error);
<<<<<<< HEAD
        res.writeHead(500).end("Internal Server Error");
    }
}

=======
        res.writeHead(500).end(JSON.stringify({ error: "Internal Server Error" }));
    }
}


>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
module.exports = {
    create_User, login_User
}



