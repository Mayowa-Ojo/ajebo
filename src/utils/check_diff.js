// compare data returned from database and data from scraper function
const scraper = require('./scraper');
const sneakerController = require('../database/sneaker_controller');

exports.checkDiff = async function(liveData = null, storedData = null) {

   try {
      if(!liveData && !storedData) {
         liveData = await scraper.scrapeURL();
         storedData = await sneakerController.getSneakers();
      }
      const hasChanges = [];

      // compare returned data
      storedData.map(el_i => {
         const foundData = liveData.find(el_j => el_i.productId == el_j.productId);

         if(foundData == undefined) {
            hasChanges.push({storedData: el_i, liveData: null});
            return;
         }

         if(foundData.productId == el_i.productId && foundData.sizes.length != el_i.sizes.length) {
            hasChanges.push({storedData: el_i, liveData: foundData});
         }
         return;
      });

      return hasChanges;
   } catch(err) {
      console.error(err);

      return;
   };
};

module.exports = exports;