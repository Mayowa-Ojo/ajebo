const Sneaker = require('./model');

/**
 * get all sneakers
 */
exports.getSneakers = async function() {
   try {
      const sneakers = await Sneaker.find({ stock: { $eq: "in-stock" }});
      return sneakers;
   } catch(err) {
      console.error(err);
   };
};

/**
 * get single sneaker
 */
exports.getSneaker = async function(id) {
   try {
      const sneaker = await Sneaker.findOne({ productId: id });
      return sneaker;
   } catch(err) {
      console.error(err);
   };
};
/**
 * create sneaker
 * 
 */
exports.createSneaker = async function() {
   const data = {
      name: "Adidas Originals NBHD | Black",
      sizes: ['41', '40', '43', '42'],
      productId: "17770"
   };

   const sneaker = new Sneaker(data);
   try {
      const newSneaker = await sneaker.save();
      console.log(newSneaker);
   } catch(err) {
      console.error(err);
   };
};

/**
 * update sneaker
 */
exports.updateSneaker = async function(id, field, update) { // TODO: add field parameter
   try {
      await Sneaker.findOneAndUpdate(
         { productId: id },
         { "$set": { [field]: update }},
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
exports.bulkUpdateSneakers = async function(field, updates) {
   if(typeof updates !== 'object') {
      throw new Error("invalid arguments: arguments should be of type <object>")
   }
   
   // loop through ids
   for (const update of updates) {
      try {
         const { id } = update;
         let value = field == 'sizes' ? JSON.parse(update.sizes).map(size => size.toString()) : update.stock;

         console.log(value)
         await Sneaker.findOneAndUpdate(
            { productId: id },
            { "$set": { [field]: value }},
            { new: true, useFindAndModify: false }
         );

      } catch(err) {
         console.error(err);
         return;
      }
   }

   return "updated products..."
}

exports.updateAllSneakers = async function(field, update) {

   try {

      const res = await Sneaker.updateMany({}, { "$set": { [field]: update }}, { new: true, useFindAndModify: false });
      console.log(res)
      return "updated products..."
   } catch(err) {
      console.error(err);
      return;
   }
}

module.exports = exports;