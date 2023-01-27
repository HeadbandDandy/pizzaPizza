const {Pizza} = require('../models')

const pizzaController = {
    // function and methods placed inside
    // need methods to GET ALL pizzas and a single pizza by its
    // id
    getPizzas(req, res) {
        // method needs to be updated to populate comment field
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            // sort method will remove id if necessary
            .sort({_id: -1})
            .then(pizzaData => res.json(pizzaData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })

    },
    // need to use populate method in structure below
    // get a singular pizza 
    getSinglePizza({params}, res) {
        Pizza.findOne({_id: params.id})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(pizzaData => res.json(pizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // method below will contain POST actions
    createPizza({body}, res) {
        Pizza.create(body).then(pizzaData => res.json(pizzaData))
        .catch(err => res.status(400).json(err));
    },

    // method below is for updating a pizza
    //update method has to contain a matching id
    updatePizza({params, body}, res) {
        // will find a single document to update
        Pizza.findOneAndUpdate({_id: params.id}, body, {
            new: true,
            runValidators: true
        })
            .then(pizzaData => {
                if(!pizzaData) {
                    res.status(404).json({message: 'No pizza found with this id'})
                    return;
                }
                res.json(pizzaData)
            })
            .catch(err => res.status(400).json(err))
    },

    // need method belwo to delete pizza/pizzas
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
            .then(pizzaData => res.json(pizzaData))
            .catch(err => res.json(err))

        
    },
    // placing an update method to add validation
    updatePizza({params, body}, res) {
        Pizza.findByIdAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(pizzaData => {
            if(!pizzaData) {
                res.status(404).json({message: 'no pizza with this id'})

            }
            res.json(pizzaData)
        })
        .catch(err => res.status(400).json(err))
    }
}


module.exports = pizzaController