const express = require('express')
const threadRouter = express.Router()
const { createNewThread, getThread } = require('../controllers/threadController')

threadRouter.post('/new', createNewThread)
threadRouter.get('/getThread', getThread)

module.exports = threadRouter