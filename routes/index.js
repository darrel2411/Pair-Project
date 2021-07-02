"use strict";

const router = require("express").Router()
const Controller = require("../controllers/controller");
const userIsLogin = require('../middlewares/isLoginMiddleware')

router.get('/', Controller.home)
router.get('/all', Controller.listAll)
router.get('/clothes', Controller.listClothes)
router.get('/cosmetics', Controller.listCosmetics)
router.get('/add', userIsLogin, Controller.addArticle)
router.post('/add', userIsLogin, Controller.addArticlePost)
router.get('/edit/:id', userIsLogin, Controller.editArticle)
router.post('/edit/:id', userIsLogin, Controller.editArticlePost)
router.get('/delete/:id', userIsLogin, Controller.deleteArticle)
router.get('/details/:id', Controller.detail)
router.get('/register', Controller.registerFormGet)
router.post('/register', Controller.registerFormPost)
router.get('/login', Controller.loginFormGet)
router.post('/login', Controller.loginFormPost)
router.get('/logout', userIsLogin, Controller.logout)





module.exports = router