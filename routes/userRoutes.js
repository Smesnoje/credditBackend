const express = require('express')
const userRouter = express.Router()
const { createNewUser, getUser, loginUser } = require('../controllers/userController')

userRouter.post('/signup', createNewUser)
userRouter.get('/getUser', getUser)
userRouter.post('/login', loginUser)

module.exports = userRouter