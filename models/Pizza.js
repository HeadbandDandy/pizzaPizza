
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    comments: [{
      type: Schema.Types.ObjectId,
      // ref prop allows pizza model to search for documents
      ref: 'Comment'
    }],
    toppings: [],
    // need to place JSON prop in schema
    toJSON: {
      virtuals: true,
    },
    id: false
});

// need to place a virtual below to add information manually
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length
})



// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;