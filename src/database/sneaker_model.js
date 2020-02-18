const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   sizes: {
      type: Array,
      required: true
   },
   productId: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('Sneaker', sneakerSchema);