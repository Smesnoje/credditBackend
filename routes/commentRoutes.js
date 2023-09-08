const express = require('express')
const commentRouter = express.Router()
const { createNewComment, getAllPostComments, getAllUserComments } = require('../controllers/commentController')

commentRouter.post('/new', createNewComment)
commentRouter.get('/getAllPostComments', getAllPostComments)
commentRouter.get('/getAllUserComments', getAllUserComments)

module.exports = commentRouter