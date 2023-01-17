const {Comment, Pizza} = require('../models')

// need to add CRUD methods for comments
// In this method comments belong to a Pizza and its id
const commentController = {

    addComment({params, body}, res) {
        console.log(body)
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
                if(!pizzaData) {
                    res.status(404).json({message: 'no pizza has this id'})
                    return;
                }
                res.json(pizzaData)
            })
            .catch(err => res.json(err))
    },

    deleteComment() {

    }

}


module.exports = commentController;
