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
        type: String,
        required: true
      },
      writtenBy: {
        type: String,
        required: true,
        trim: true
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
const CommentSchema = new Schema(
    {
      writtenBy: {
        type: String,
        required: true
      },
      commentBody: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue)
      },
      // association for replySchema
      replies: [ReplySchema]
    },
    {
        // getters and virtuals placed
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

//virtual for comment placed below

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });



const Comment = model('Comment', CommentSchema);

module.exports = Comment;