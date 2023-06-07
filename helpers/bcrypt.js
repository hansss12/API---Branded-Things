const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

function hashPassword(password) {
    return bcrypt.hashSync(password);
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

function compareToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
}

function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = { hashPassword, comparePassword, compareToken, createToken }