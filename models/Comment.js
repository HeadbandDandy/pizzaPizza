const {Schema, model} = require('mongoose')

// initilization of comment model
const CommentSchema = new Schema ({
    author: {
        type: String
    },

    body: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;