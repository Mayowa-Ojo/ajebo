const mongoose = require('mongoose');

const trainingKitSchema = new mongoose.Schema({
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

module.exports = mongoose.model('TrainingKit', trainingKitSchema);