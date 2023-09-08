const express = require('express')
const threadRouter = express.Router()
const { createNewThread } = require('../controllers/threadController')

threadRouter.post('/new', createNewThread)

module.exports = threadRouter