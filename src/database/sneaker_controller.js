const Sneaker = require('./sneaker_model');

/**
 * 
 */
exports.getSneakers = async function(req, res) {
   try {
      const sneakers = await Sneaker.find();
      console.log(sneakers);
   } catch(err) {
      console.error(err)
   };
};

/**
 * 
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

module.exports = exports;