const express = require('express')
const { home } = require('../controller/controller')
let router = express.Router()
router.get('/', home)



module.exports =router