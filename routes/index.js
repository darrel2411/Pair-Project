"use strict";

const router = require("express").Router()
const Controller = require('../controllers/controllerHome')
const clothes = require('./routerClothes')
const cosmetics = require('./routerCosmetics')

router.get('/', Controller.home)
router.use('/clothes', clothes)
router.use('/cosmetics', cosmetics)



module.exports = router