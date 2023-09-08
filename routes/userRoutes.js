const express = require('express')
const userRouter = express.Router()
const { createNewUser } = require('../controllers/userController')

userRouter.post('/signup', createNewUser)

module.exports = userRouter