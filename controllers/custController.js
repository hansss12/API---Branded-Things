const { Op } = require("sequelize")
const { getPagination, getPagingData } = require("../helpers/pagination")
const { Product, Category, User, Bookmark } = require("../models")
const { createToken } = require("../helpers/bcrypt");
const { OAuth2Client } = require('google-auth-library');
const { hashPassword } = require("../helpers/bcrypt");

class CustController {
    static async register(req, res, next) {
        const { username, email, password } = req.body
        try {
            const hash = hashPassword(password)
            const createUser = await User.create({ username, email, password: hash, role: "customer" }, { hooks: false })
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
                    role: "customer"
                },
                hooks: false
            });
            const accessToken = createToken({
                id: user.id
            })
            res.status(200).json({
                message: 'Success Login',
                accessToken
            })
            if (created) {
                res.status(200).json({
                    message: 'Success Login',
                    accessToken
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async findAllProduct(req, res, next) {
        try {
            const { page, size, name } = req.query;
            const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            const { limit, offset } = getPagination(page, size);

            const pagination = await Product.findAndCountAll({ where: condition, limit, offset })

            const response = getPagingData(pagination, page, limit);
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    static async detail(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findByPk(id)
            if (!product) {
                throw { name: "Error : Detail not found" }
            }
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }
    static async bookmark(req, res, next) {
        try {
            const user = req.user
            const bookmark = await Bookmark.findAll({ include: Product, where: { UserId: user.id } })
            res.status(200).json(bookmark)
        } catch (error) {
            next(error)
        }
    }
    static async addBookmark(req, res, next) {
        try {
            const user = req.user
            const { id } = req.params
            const product = await Product.findByPk(id)
            if (!product) {
                throw { name: "Error : Detail not found" }
            }
            const bookmark = await Bookmark.create({ ProductId: id, UserId: user.id })
            res.status(201).json({
                message: "Success add bookmark",
                data: bookmark
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const user = req.user
            const { id } = req.params
            const product = await Product.findByPk(id)
            if (!product) {
                throw { name: "Error : Detail not found" }
            }
            const bookmark = await Bookmark.destroy({ where: { ProductId: id, UserId: user.id } })
            res.status(200).json({
                message: "Success remove bookmarks"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CustController