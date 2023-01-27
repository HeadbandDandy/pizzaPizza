const router = require('express').Router();
const {addComment, deleteComment, addReply, removeReply} = require('../../controllers/comment-controller');

// need to place routes below and use import from controller above

// first route will contain pizzaID 
router.route('/:pizzaId').post(addComment);



// route below will allow for deletion of comments
// need to ensure that server knows which comment was deleted
// route will contain PUT route to handle new replies
router
    .route('/pizzaId/:commentId')
    .put(addReply)
    .delete(deleteComment)

// need route to delete replies
router.route('/:pizzaId/commentId/:replyId').delete(removeReply)





module.exports = router