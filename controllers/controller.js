const { Product, User, History } = require("../models")

class Controller {
    static async findAll(req, res, next) {
        try {
            // const products
            const product = await Product.findAll({
                include: {
                    model: User,
                    attributes: { exclude: 'password' },
                    as: 'authors'
                },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId } = req.body
            const authorId = req.user.id
            const user = await User.findByPk(authorId)
            const product = await Product.create({ name, description, price, stock, imgUrl, authorId, categoryId, status: 'Active' })
            const history = await History.create({ name: name, description: `entity with id ${product.id} created`, updatedBy: user.username, status: "Active" })
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async findById(req, res, next) {
        try {
            const { id } = req.params
            const productDetail = await Product.findByPk(id)
            if (!productDetail) {
                throw { name: "Error : Detail not found" }
            }
            res.status(200).json(productDetail)
        } catch (error) {
            next(error)
        }
    }

    static async destroy(req, res, next) {
        try {
            const { id } = req.params
            const productDetail = await Product.findByPk(id)
            if (!productDetail) {
                throw { name: "Error : Detail not found" }
            }
            await Product.destroy({ where: { id } })
            res.status(200).json({ message: `${productDetail.name} successfully deleted`, data: productDetail })
        } catch (error) {
            next(error)
        }
    }

    static async edit(req, res, next) {
        try {
            const { id } = req.params
            const { name, description, price, stock, imgUrl, categoryId } = req.body
            const authorId = req.user.id
            const user = await User.findByPk(authorId)
            const findProduct = await Product.findByPk(id)
            if (!findProduct) {
                throw { name: "Error : Detail not found" }
            }
            const product = await Product.update({ name, description, price, stock, imgUrl, categoryId }, { where: { id } })
            const history = await History.create({ name: findProduct.name, description: `entity with id ${id} updated`, updatedBy: user.username, status: findProduct.status })
            res.status(200).json({
                message: "Success Update"
            })
        } catch (error) {
            next(error)
        }
    }
    static async patchInactive(req, res, next) {
        try {
            const { id } = req.params
            const { status } = req.body
            const authorId = req.user.id
            const user = await User.findByPk(authorId)
            const findProduct = await Product.findByPk(id)
            if (!findProduct) {
                throw { name: "Error : Detail not found" }
            }
            const product = await Product.update({ status: status }, { where: { id } })
            const history = await History.create({ name: findProduct.name, description: `entity status with id ${id} has been updated from ${findProduct.status} into ${status}`, updatedBy: user.username, status })
            res.status(200).json({
                message: "Success Update"
            })
        } catch (error) {
            next(error)
        }
    }

    static async history(req, res, next) {
        try {
            const history = await History.findAll({ order: [['createdAt', 'DESC']] })
            res.status(200).json({ history })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller