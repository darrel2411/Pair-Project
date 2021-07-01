"use strict";

const router = require('express').Router()
const ControllerCosmetics = require('../controllers/controllerCosmetics')

router.get('/', ControllerCosmetics.listCosmetics)
router.get('/add', ControllerCosmetics.addArticleCosmetic)
router.post('/add', ControllerCosmetics.addArticleCosmeticPost)
router.get('/edit/:id', ControllerCosmetics.editArticleCosmetic)
router.post('/edit/:id', ControllerCosmetics.editArticleCosmeticPost)
router.get('/delete/:id', ControllerCosmetics.deleteArticleCosmetic)



module.exports = router