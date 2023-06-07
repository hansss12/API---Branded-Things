const { compareToken } = require('../helpers/bcrypt')
const { Product, Category, User } = require("../models")

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if (authHeader) {
            const token = authHeader
            const success = compareToken(token)
            const user = await User.findByPk(success.id, {
                attributes: ["id", "role"]
            })
            if (!user) {
                throw { name: "Error : Invalid Email or Password" }
            }
            req.user = user
            next()
        } else {
            throw { name: "Error : Invalid Token" }
        }
    } catch (error) {
        next(error)
    }
}

const isAdmin = async (req, res, next) => {
    const { id } = req.params
    const user = req.user
    try {
        const deleteProduct = await Product.findByPk(id)
        if (!deleteProduct) {
            throw { name: "Error : Detail not found" }
        }
        if (user.role === "admin") {
            next()
        } else {
            if (deleteProduct.authorId !== user.id) {
                throw { name: "Error : Acces Denied" }
            }
            next()
        }
    } catch (error) {
        next(error)
    }
}

const isAdminV2 = async (req, res, next) => {
    const user = req.user
    try {
        if (user.role != 'admin') {
            throw { name: "Error : Acces Denied" }
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { isAdmin, auth, isAdminV2 }