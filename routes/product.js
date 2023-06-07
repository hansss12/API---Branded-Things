const express = require('express')
const Controller = require('../controllers/controller')
const { isAdmin, isAdminV2 } = require('../middlewares/authentication')
const router = express.Router()

router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.put('/:id', isAdminV2, Controller.edit)
router.patch('/:id', isAdminV2, Controller.patchInactive)
router.get('/:id', Controller.findById)
router.delete('/:id', isAdmin, Controller.destroy)

module.exports = router