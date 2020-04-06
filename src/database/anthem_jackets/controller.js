const AnthemJacket = require('./model');

/**
 * get all sneakers
 */
exports.getAnthemJackets = async function() {
   try {
      const anthemJackets = await AnthemJacket.find({ stock: { $eq: "in-stock" }});
      return anthemJackets;
   } catch(err) {
      console.error(err);
   };
};

/**
 * get single sneaker
 */
exports.getAnthemJacket = async function(id) {
   try {
      const anthemJacket = await AnthemJacket.findOne({ productId: id });
      return anthemJacket;
   } catch(err) {
      console.error(err);
   };
};
/**
 * create sneaker
 * 
 */
exports.createAnthemJacket = async function() {
   const data = {
      name: "Adidas Originals NBHD | Black",
      sizes: ['41', '40', '43', '42'],
      productId: "17770"
   };

   const anthemJacket = new AnthemJacket(data);
   try {
      const newAnthemJacket = await anthemJacket.save();
      console.log(newAnthemJacket);
   } catch(err) {
      console.error(err);
   };
};

/**
 * update sneaker
 */
exports.updateAnthemJacket = async function(id, update) {
   try {
      await AnthemJacket.findOneAndUpdate(
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
exports.bulkUpdateAnthemJackets = async function(updates) {
   if(typeof updates !== 'object') {
      throw new Error("invalid arguments: arguments should be of type <object>")
   }
   
   // loop through ids
   for (const update of updates) {
      try {
         const { id } = update;
         let value = field == 'sizes' ? JSON.parse(update.sizes).map(size => size.toString()) : update.stock;

         console.log(value)
         await AnthemJacket.findOneAndUpdate(
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

exports.updateAllAnthemJackets = async function(field, update) {

   try {
      const res = await AnthemJacket.updateMany({}, { "$set": { [field]: update }}, { new: true, useFindAndModify: false });
      console.log(res)
      return "updated products..."
   } catch(err) {
      console.error(err);
      return;
   }
}

module.exports = exports;