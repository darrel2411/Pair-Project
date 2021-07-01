"use strict";

const router = require('express').Router()
const ControllerClothes = require('../controllers/controllerClothes')
const userIsLogin = require('../middlewares/isLoginMiddleware')

router.get('/', ControllerClothes.listClothes)
router.get('/add',userIsLogin,ControllerClothes.addArticleCloth)
router.post('/add',userIsLogin,ControllerClothes.addArticleClothPost)
router.get('/edit/:id',userIsLogin,ControllerClothes.editArticleCloth)
router.post('/edit/:id',userIsLogin,ControllerClothes.editArticleClothPost)
router.get('/delete/:id',userIsLogin,ControllerClothes.deleteArticleCloth)
router.get('/details/:id',ControllerClothes.detail)
router.get('/register', ControllerClothes.registerFormGet)
router.post('/register', ControllerClothes.registerFormPost)
router.get('/login',ControllerClothes.loginFormGet)
router.post('/login',ControllerClothes.loginFormPost)
router.get('/logout',ControllerClothes.logout)



module.exports = router