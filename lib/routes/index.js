const express = require('express')
const router = express.Router()
const notes = require('./notes/notes.controller')
const user = require('./user/user.controller')
const auth = require('./auth/auth.controller')
const apiErrorHandler = require('./error.handler')

router.use('/notes', notes)
router.use('/user', user)
router.use('/auth', auth)
router.use(apiErrorHandler)

module.exports = router