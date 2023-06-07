const express = require('express')
const Controller = require('../controllers/controller')
const { isAdmin, auth } = require('../middlewares/authentication')
const router = express.Router()
const productRouter = require('./product')
const userRouter = require('./user')
const categoryRouter = require('./category')
const costumerRouter = require('./costumer')

router.use('/', userRouter)
router.use('/customers', costumerRouter)
router.use(auth)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.get('/histories', Controller.history)

module.exports = router