const router = require('express').Router()

const {
    getPizzas,
    getSinglePizza,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller')

// set up routes for ALL methods
router 
    .route('/')
    .get(getPizzas)
    .post(createPizza)

// set up routes for SINGLE methods
router 
    .route('/:id')
    .get(getSinglePizza)
    .put(updatePizza)
    .delete(deletePizza)

module.exports = router;