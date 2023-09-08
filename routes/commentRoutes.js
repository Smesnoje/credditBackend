const express = require('express')
const commentRouter = express.Router()
const { createNewComment } = require('../controllers/commentController')

commentRouter.post('/new', createNewComment)

module.exports = commentRouter