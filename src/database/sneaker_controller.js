const Sneaker = require('./sneaker_model');

/**
 * get sneakers
 */
exports.getSneakers = async function(req, res) {
   try {
      const sneakers = await Sneaker.find();
      return sneakers
   } catch(err) {
      console.error(err)
   };
};

/**
 * create sneaker
 * 
 */
exports.createSneaker = async function(req, res) {
   const data = {
      name: "Adidas Originals NBHD | Black",
      sizes: ['41', '40', '43', '42'],
      productId: "17770"
   };

   const sneaker = new Sneaker(data);
   try {
      const newSneaker = await sneaker.save();
      console.log(newSneaker)
   } catch(err) {
      console.error(err)
   };
};

/**
 * update sneaker
 */
exports.updateSneaker = async function(req, res) {

};

module.exports = exports;