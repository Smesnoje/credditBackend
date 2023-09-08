const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        thread: {type: mongoose.Schema.Types.ObjectId, ref: 'thread', required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    }
)

const postModel = mongoose.model('post', postSchema)

module.exports = postModel