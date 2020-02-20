// compare data returned from database and data from scraper function
const scraper = require('./scraper');
const sneakerController = require('../database/sneaker_controller');

exports.checkDiff = async function() {
   
   try {
      const liveData = await scraper.scrapeURL();
      const persistedData = await sneakerController.getSneakers();
      const hasChanges = []
      
      // compare returned data
      persistedData.map(el_i => {
         liveData.find(el_j => {
            // first condition - find matching object
            // second condition - check for differences in sneaker size
            if(el_i.productId == el_j.productId && el_i.sizes.length !== el_j.sizes.length) {
               hasChanges.push({live_data: el_j, stored_data: el_i});
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