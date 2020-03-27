const TrainingKit = require('./model');

/**
 * get all sneakers
 */
exports.getTrainingKits = async function() {
   try {
      const trainingKits = await TrainingKit.find();
      return trainingKits;
   } catch(err) {
      console.error(err);
   };
};

/**
 * get single sneaker
 */
exports.getTrainingKit = async function(id) {
   try {
      const trainingKit = await TrainingKit.findOne({ productId: id });
      return trainingKit;
   } catch(err) {
      console.error(err);
   };
};
/**
 * create sneaker
 * 
 */
exports.createTrainingKit = async function() {
   const data = {
      name: "Adidas Originals NBHD | Black",
      sizes: ['41', '40', '43', '42'],
      productId: "17770"
   };

   const trainingKit = new TrainingKit(data);
   try {
      await trainingKit.save();
      console.log("product created");
   } catch(err) {
      console.error(err);
   };
};

/**
 * update sneaker
 */
exports.updateTrainingKit = async function(id, update) {
   try {
      await TrainingKit.findOneAndUpdate(
         { productId: id },
         { "$set": { "sizes": update.sizes }},
         { new: true, useFindAndModify: false }
      );

      return "updated fields [>]"
   } catch(err) {
      console.error(err);
      return;
   };
};

/**
 * 
 * @param {object} ids - array of sneaker ids
 * @param {object} updates - array of updates
 */
exports.bulkUpdateTrainingKits = async function(updates) {
   if(typeof updates !== 'object') {
      throw new Error("invalid arguments: arguments should be of type <object>")
   }
   
   // loop through ids
   for (const update of updates) {
      try {
         const { id, sizes } = update;
         // format sizes
         const formatedSizes = JSON.parse(sizes).map(size => size.toString());
         
         await TrainingKit.findOneAndUpdate(
            { productId: id },
            { "$set": { "sizes": formatedSizes }},
            { new: true, useFindAndModify: false }
         );

      } catch(err) {
         console.error(err);
         return;
      }
   }

   return "updated products..."
}

module.exports = exports;