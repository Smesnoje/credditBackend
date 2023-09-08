const express = require('express')
const userRouter = express.Router()
const { createNewUser, getUser } = require('../controllers/userController')

userRouter.post('/signup', createNewUser)
userRouter.get('/getUser', getUser)

module.exports = userRouter