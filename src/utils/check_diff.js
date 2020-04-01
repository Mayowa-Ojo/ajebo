// compare data returned from database and data from scraper function
const scraper = require('./scraper');
const { getSneakers } = require('../database/sneakers/controller');
const { getAnthemJackets } = require('../database/anthem_jackets/controller');
const { getTrainingKits } = require('../database/training_kits/controller');
const { getTrackSuits } = require('../database/tracksuits/controller');

exports.checkDiff = async function(category, liveData = null, storedData = null) {

   const controllers = {
      "sneakers": getSneakers,
      "anthem-jackets": getAnthemJackets,
      "training-kits": getTrainingKits,
      "tracksuits": getTrackSuits
   };

   try {
      if(!liveData && !storedData) {
         liveData = await scraper.scrapeURL(category);
         storedData = await controllers[category]();
      }
      const hasChanges = [];

      // compare returned data
      for(let i = 0; i < storedData.length; i++) {
         const foundData = liveData.find(el_j => storedData[i].productId == el_j.productId);

         if(foundData == undefined) {
            hasChanges.push({storedData: storedData[i], liveData: null});
            continue;
         }

         if(foundData.sizes.length != storedData[i].sizes.length) {
            hasChanges.push({storedData: storedData[i], liveData: foundData});
            continue;
         }

      };

      return hasChanges;
   } catch(err) {
      console.error(err);

      return;
   };
};

module.exports = exports;