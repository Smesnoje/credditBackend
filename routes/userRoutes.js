const express = require('express')
const userRouter = express.Router()
const { createNewUser, getUser, loginUser, logoutUser } = require('../controllers/userController')

userRouter.post('/signup', createNewUser)
userRouter.get('/getUser', getUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)


module.exports = userRouter