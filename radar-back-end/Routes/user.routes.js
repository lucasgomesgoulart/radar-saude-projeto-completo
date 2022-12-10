const express = require('express')
const UserController = require('../Controller/UserController')
const router = express.Router()

router.post('/insert', UserController.insert)
router.put('/update/:id', UserController.update)
router.delete('/deletar/:id', UserController.delete)
router.get('/select', UserController.findAll)

module.exports = router