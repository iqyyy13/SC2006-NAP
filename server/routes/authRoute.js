const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/signup', authController.signup) // create new account
router.post('/login', authController.login) // login to account
router.post('/sendVerificationEmail', authController.sendVerificationEmail) // request change password of account
router.post('/verifyRequestAndUpdate', authController.verifyRequestAndUpdate) // verify email code and change password
router.post('/logout', authController.logout) // logout of account

module.exports = router