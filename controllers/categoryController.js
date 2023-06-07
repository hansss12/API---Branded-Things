const { Product, Category, User } = require("../models")

class CategoryController {
    static async findAll(req, res, next) {
        try {
            // const categories
            const category = await Category.findAll({ order: [['createdAt', 'DESC']] })
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { name } = req.body
            const category = await Category.create({ name })
            res.status(200).json({
                message: `Success`
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const destroy = await Category.destroy({ where: { id } })
            res.status(201).json({
                message: `Success`
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const update = await Category.update({ name }, { where: { id } })
            res.status(200).json({
                message: `Success Update`
            })
        } catch (error) {
            next(error)
        }
    }

    static async detailCategory(req, res, next) {
        try {
            const { id } = req.params
            const category = await Category.findByPk(id)
            res.status(200).json({
                category
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CategoryController