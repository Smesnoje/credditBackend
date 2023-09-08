const mongoose = require('mongoose')

const threadSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        picture: String,
        dateCreated: {type: Date, default: Date.now},
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    }
)

const threadModel = mongoose.model('thread', threadSchema)

module.exports = threadModel