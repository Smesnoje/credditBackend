const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        content: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    }
)

const commentModel = mongoose.model('user', commentSchema)

module.exports = commentModel