const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {

    try {
        //একটা custom headers লাগবে যেটা মুলত String এরপর split করবো এর [0] তে 'Bearer' লেখাটা থাকবে এবং [1] এ থাকবে token
        const token = req.headers.authorization.split(' ')[1]
        //decode the token and varify
        const decode = jwt.verify(token, 'SECRET')

        //for getting the user from route
        req.user = decode
        next()

    } catch (error) {
        res.json({
            message: 'Authentication Falild'
        })
    }
}

module.exports = authenticate