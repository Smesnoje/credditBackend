const express = require('express')
const postRouter = express.Router()
const { createNewPost, getAllThreadPosts, getAllUserPosts } = require('../controllers/postController')

postRouter.post('/new', createNewPost)
postRouter.get('/getAllThreadPosts', getAllThreadPosts)
postRouter.get('/getAllUserPosts', getAllUserPosts)

module.exports = postRouter