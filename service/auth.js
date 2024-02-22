const jwt = require("jsonwebtoken");
<<<<<<< HEAD
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
=======
const uuid = require("uuid");
const secret = "AyAn!#@$";

async function generateToken(email, password) {
    const user_id = uuid.v4();
    const userRole = "NORMAL";
    const payload = {
        user_id, email, password, userRole
    }
    return jwt.sign(payload, secret);
}

async function getUser(token) {
    const verify_Token = await jwt.verify(token, secret);
>>>>>>> 28aa799d4f4ddc65b44b7a882585457894f93f84
    return verify_Token;
}

module.exports = {
    generateToken, getUser
}