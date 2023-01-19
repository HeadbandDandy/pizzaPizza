const router = require('express').Router();
const {addComment, deleteComment} = require('../../controllers/comment-controller');
const { route } = require('./pizza-routes');

// need to place routes below and use import from controller above

// first route will contain pizzaID 
router.route('/:pizzaId').post(addComment);



// route below will allow for deletion of comments
// need to ensure that server knows which comment was deleted
router.route('/:pizzaId/:commentId').delete(deleteComment)







module.exports = router