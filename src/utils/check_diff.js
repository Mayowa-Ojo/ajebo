// compare data returned from database and data from scraper function
const scraper = require('./scraper');
const sneakerController = require('../database/sneaker_controller');

exports.checkDiff = async function() {
   
   try {
      const liveData = await scraper.scrapeURL();
      const storedData = await sneakerController.getSneakers();
      const hasChanges = [];
      
      // compare returned data
      storedData.map(el_i => {
         liveData.find(el_j => {
            if(el_j.productId == el_i.productId && el_j.sizes.length != el_i.sizes.length) {
               hasChanges.push({storedData: el_i, liveData: el_j});
            }
         });
         return;
      });

      return hasChanges;
   } catch(err) {
      console.error(err);

      return;
   };
};

module.exports = exports;