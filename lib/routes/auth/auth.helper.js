const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs-then');

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.headers.token;

    if (!token)
        return res.status(401).send('Unauthorized');

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return next('Unauthorized');

        res.locals.id = decoded.id
            // if everything is good, save to request for use in other routes
        return next()
    });

};

function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

function comparePassword(eventPassword, userPassword, userId) {
    return bcrypt.compare(eventPassword, userPassword)
        .then(passwordIsValid =>
            !passwordIsValid ? Promise.reject('The credentials do not match.') : signToken(userId)
        );
}



function checkIfInputIsValid(req, res, next) {
    if (!(req.body.password &&
            req.body.password.length >= 7)) {
        return next(new Error('Password error. Password needs to be 8 characters or more.'));
    }

    if (!(req.body.name &&
            req.body.name.length > 5 &&
            typeof req.body.name === 'string')) return next(new Error('Username error. Username needs to longer than 5 characters'));

    if (!(req.body.email &&
            typeof req.body.name === 'string')) return next(new Error('Email error. Email must have valid characters.'));

    return next();
}

module.exports = { verifyToken, signToken, comparePassword, checkIfInputIsValid }