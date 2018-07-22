const express = require('express');
const authController = express.Router();
const User = require('../user/user');
const bcrypt = require('bcryptjs-then');
const { signToken, comparePassword, checkIfInputIsValid } = require('./auth.helper')

authController.post('/register', checkIfInputIsValid, async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        res.status(400).send('User with the same information already exists. You may try to login instead')
    } else {
        const hash = await bcrypt.hash(req.body.password, 8)
        const newUser = await User.create({ name: req.body.name, email: req.body.email, password: hash })

        res.status(200).send({ auth: true, token: signToken(newUser._id) })
    }


})

authController.post('/login', async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(401).send('User with that email does not exits.')
    }
    let token;
    try {
        token = await comparePassword(req.body.password, user.password, user._id)
        res.status(200).send({ auth: true, token })
    } catch (e) {
        res.status(403).send(e)
    }

})

module.exports = authController