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
    },
    // get a singular pizza 
    getSinglePizza({params}, res) {
        Pizza.findOne({_id: params.id})
            .then(pizzaData => {
                if(!pizzaData) {
                    res.status(404).json({message: 'No pizza found with that id'})
                    return
                }
                res.json(pizzaData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}


module.exports = pizzaController