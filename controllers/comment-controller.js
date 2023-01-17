const {Comment, Pizza} = require('../models')

// need to add CRUD methods for comments
// In this method comments belong to a Pizza and its id
const commentController = {

    addComment({params, body}, res) {
        console.log(body)
        Comment.create(body)
            .then(({_id}) => {
                console.log(_id)
            })
    },

    deleteComment() {

    }

}


module.exports = commentController;
