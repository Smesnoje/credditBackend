const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        profilePicture: {type: String, required: false},
        dateCreated: {type: Date, default: Date.now},
        joinedThreads: [{type: mongoose.Schema.Types.ObjectId, ref: 'thread'}],
        ownedThreads: [{type: mongoose.Schema.Types.ObjectId, ref: 'thread'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
        comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
    }
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel