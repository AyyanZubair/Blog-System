const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateToken(user_id, email, Password) {
    const userRole = "ADMIN";
    const payload = {
        user_id, email, Password, userRole
    }
    return jwt.sign(payload, process.env.secret);
}

async function getUser(token) {
    const verify_Token = await jwt.verify(token, process.env.secret);
    return verify_Token;
}

module.exports = {
    generateToken, getUser
}