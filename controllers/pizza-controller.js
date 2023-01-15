const {Pizza} = require('../models')

const pizzaController = {
    // function and methods placed inside
    // need methods to GET ALL pizzas and a single pizza by its
    // id
    getPizzas(req, res) {
        Pizza.find({})
        .then(pizzaData => res.json(pizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    }
}


module.exports = pizzaController