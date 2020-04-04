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
   },
   stock: {
      type: String,
      enum: ["in-stock", "out-of-stock"],
      required: true,
      default: "in-stock"
   }
});

module.exports = mongoose.model('Sneaker', sneakerSchema);