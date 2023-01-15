const router = require('express').Router();

// set up routes for ALL methods
router 
    .route('/')
    .get()
    .post()

// set up routes for SINGLE methods
router 
    .route('/:id')
    .get()
    .put()
    .delete()

module.exports = router;