const express = require('express')
const UserController = express.Router()
const User = require('./user')
const { verifyToken } = require('../auth/auth.helper')

UserController.get('/getUsers', async(req, res, next) => {
    const users = await User.find()
    res.status(200).send(users)
})


UserController.get('/me', verifyToken, async(req, res, next) => {

    const user = await User.findById(res.locals.id, { password: 0 })
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(404).send('User not found')
    }
})

module.exports = UserController