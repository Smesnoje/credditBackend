const mongoose = require('mongoose')

const threadSchema = mongoose.Schema(
    {
        name: String,
        picture: String,
        dateCreated: {type: Date, default: Date.now},
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
    }
)

const threadModel = mongoose.model('user', threadSchema)

module.exports = threadModel