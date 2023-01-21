const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//initialization of reply schema 
const ReplySchema = new Schema(
    {
        //unique identifier
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String
      },
      writtenBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

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
    },
    //association for replies and comments
    replies: [ReplySchema]
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;