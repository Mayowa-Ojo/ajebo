const TrackSuit = require('./model');

/**
 * get all sneakers
 */
exports.getTrackSuits = async function() {
   try {
      const trackSuits = await TrackSuit.find({ stock: { $eq: "in-stock" }});
      return trackSuits;
   } catch(err) {
      console.error(err);
   };
};

/**
 * get single sneaker
 */
exports.getTrackSuit = async function(id) {
   try {
      const trackSuit = await TrackSuit.findOne({ productId: id });
      return trackSuit;
   } catch(err) {
      console.error(err);
   };
};
/**
 * create sneaker
 * 
 */
exports.createTrackSuit = async function() {
   const data = {
      name: "Adidas Originals NBHD | Black",
      sizes: ['41', '40', '43', '42'],
      productId: "17770"
   };

   const trackSuit = new TrackSuit(data);
   try {
      await trackSuit.save();
      console.log("product created");
   } catch(err) {
      console.error(err);
   };
};

/**
 * update sneaker
 */
exports.updateTrackSuit = async function(id, update) {
   try {
      await TrackSuit.findOneAndUpdate(
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
exports.bulkUpdateTrackSuits = async function(updates) {
   if(typeof updates !== 'object') {
      throw new Error("invalid arguments: arguments should be of type <object>")
   }
   
   // loop through ids
   for (const update of updates) {
      try {
         const { id, sizes } = update;
         // format sizes
         const formatedSizes = JSON.parse(sizes).map(size => size.toString());
         
         await TrackSuit.findOneAndUpdate(
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