const { User } = require("../models")
const jwt = require('jsonwebtoken');
const { comparePassword, createToken } = require("../helpers/bcrypt");
require('dotenv').config()
const JWT_SECRET = process.env.SECRET_KEY
const { OAuth2Client } = require('google-auth-library');
class UserController {
    static async google(req, res, next) {
        try {
            const googleToken = req.headers.googletoken
            const client = new OAuth2Client("865795531816-9s3rn6nslv5j1gdu1jojkcbg37gp5j2j.apps.googleusercontent.com");
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "865795531816-9s3rn6nslv5j1gdu1jojkcbg37gp5j2j.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "google",
                    role: "staff"
                },
                hooks: false
            });
            const accessToken = createToken({
                id: user.id
            })
            res.status(200).json({
                message: 'Success Login',
                id: user.id,
                username: user.username,
                role: user.role,
                accessToken
            })
            if (created) {
                res.status(200).json({
                    message: 'Success Login',
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    accessToken
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body
        try {
            const createUser = await User.create({ username, email, password, phoneNumber, address })
            res.status(201).json({
                message: `User with username ${createUser.username} successfully created`,
                data: {
                    id: createUser.id,
                    email: createUser.email
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            console.log(email, password)
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: "Error : Login failed" }
            }
            console.log(user)
            const success = await comparePassword(password, user.password)
            if (success) {
                jwt.sign({
                    id: user.id,
                }, JWT_SECRET, (err, token) => {
                    console.log(err)
                    res.status(200).json({
                        message: 'Success Login',
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        token
                    })
                })
            } else {
                throw { name: "Error : Login failed" }
            }
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            const user = await User.findAll({ order: [['createdAt', 'ASC']], attributes: { exclude: 'password' }, })
            res.status(200).json({
                user
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController