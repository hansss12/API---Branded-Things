const express = require('express')
const CategoryController = require('../controllers/categoryController')
const router = express.Router()

router.get('/', CategoryController.findAll)
router.post('/', CategoryController.create)
router.get("/:id", CategoryController.detailCategory)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router