"use strict"

const userIsLogin = (req,res,next) => {
    console.log(req.session.isLogin)
    if(req.session.isLogin){
        next()
    } else {
        res.redirect('/clothes/login')
    }
}

module.exports = userIsLogin