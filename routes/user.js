const express = require('express')
const Controller = require('../controllers/userController')
const router = express.Router()
const { isAdmin, auth } = require('../middlewares/authentication')

router.get("/", Controller.findUser)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign-in', Controller.google)

module.exports = router