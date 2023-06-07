const express = require('express')
const Controller = require('../controllers/controller')
const CustController = require('../controllers/custController')
const UserController = require('../controllers/userController')
const { isAdmin, isAdminV2, auth } = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', CustController.register)
router.post('/login', UserController.login)
router.post("/google", CustController.google)
router.get("/products", CustController.findAllProduct)
router.get("/products/:id", CustController.detail)
router.use(auth)
router.get('/bookmarks', CustController.bookmark)
router.post("/bookmarks/:id", CustController.addBookmark)
router.delete("/bookmarks/:id", CustController.delete)

module.exports = router