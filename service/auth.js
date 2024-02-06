const jwt = require("jsonwebtoken");
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
    return verify_Token;
}

module.exports = {
    generateToken, getUser
}