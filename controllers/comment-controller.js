const {Comment, Pizza} = require('../models')

// need to add CRUD methods for comments
// In this method comments belong to a Pizza and its id
const commentController = {

    addComment({params, body}, res) {
        console.log(params)
        Comment.create(body)
            .then(({_id}) => {
                return Pizza.findOneAndUpdate(
                    {_id: params.pizzaId},
                    {$push: {comments: _id}},
                    {new: true}
                )
            })
            // need to format error message for above statement
            .then(pizzaData => {
                console.log(pizzaData)
                if(!pizzaData) {
                    res.status(404).json({message: 'no pizza has this id'})
                    return;
                }
                res.json(pizzaData)
            })
            .catch(err => res.json(err))
    },
// delete comment needs to return an error message
// also needs to contain params for the ID and pull for one pizza
    deleteComment({params}, res) {
        Comment.findOneAndDelete({_id: params.commentId})
            .then(deletedComment => {
                if(!deletedComment) {
                    return res.status(404).json({message: 'No comment with this id'})

                }
                // after it is deleted the comment needs to be updated under the Pizza
                return Pizza.findOneAndUpdate(
                    {_id: params.pizzaId},
                    {$pull: {comments: params.commentId}},
                    {new: true}
                )
            })
            // convert data to JSON
            .then(pizzaData => {
                if(!pizzaData) {
                    res.status(404).json({message: 'no pizza found with this id'})
                    return 
                }
                res.json(pizzaData)
            })
            .catch(err => res.json(err))
    },
    // add reply will be added below to push data into comment
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $push: { replies: body } },
          {new: true, runValidators: true}
        )
          .then(pizzaData => {
            if (!pizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(pizzaData);
          })
          .catch(err => res.json(err));
      },
      // need to copy over add reply logic to removeReply()
      removeReply({params}, res) {
          Comment.findOneAndUpdate(
              {_id: params.commentId},
            //   uses MongoDb pull operator to remove specific id
              {$pull: {replies: {replyId: params.replyId}}},
              {new: true}
          )
          .then(pizzaData => res.json(pizzaData))
          .catch(err => res.json(err))
      }

}


module.exports = commentController;
