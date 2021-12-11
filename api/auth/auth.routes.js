const express = require('express')
const {login, signup, logout, externalLogin} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/externalLogin', externalLogin)
router.post('/signup', signup)
router.post('/logout', logout)

module.exports = router