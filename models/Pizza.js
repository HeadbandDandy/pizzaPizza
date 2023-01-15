const {Schema, model} = require('mongoose');


// schema below uses strings, timestamps for tracking, and an array for 
// toppings. 
const PizzaSchema = new Schema ({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
})
