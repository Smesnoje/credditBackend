const express = require('express')
const postRouter = express.Router()
const { createNewPost } = require('../controllers/postController')

postRouter.post('/new', createNewPost)

module.exports = postRouter