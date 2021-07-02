"use strict"

const userIsLogin = (req, res, next) => {
    if (req.session.isLogin) {
        next()
    } else {

        res.redirect('/login')
    }
}

module.exports = userIsLogin