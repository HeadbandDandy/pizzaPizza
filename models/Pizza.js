
const { Schema, model, trusted } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //below contains getter for pizza retrieval
      //every pizza GOT will return a time and date formatting
      get: (createdAtValue) => dateFormat(createdAtValue)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// need to place a virtual below to add information manually
// updated to include replies as well! reduce() calculates value based on accumulating values(comments) in array
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});


// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;