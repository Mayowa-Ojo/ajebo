// compare data returned from database and data from scraper function
const scraper = require('./scraper');
const { getSneakers } = require('../database/sneakers/controller');
const { getAnthemJackets } = require('../database/anthem_jackets/controller');
const { getTrainingKits } = require('../database/training_kits/controller');
const { getTrackSuits } = require('../database/tracksuits/controller');

exports.checkDiff = async function(liveData = null, storedData = null) {

   const diff = {};

   const categories = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ];

   const controllers = [
      getSneakers,
      getAnthemJackets,
      getTrainingKits,
      getTrackSuits
   ];
   // temporary - run only one loop for sneakers.
   for(let i = 0; i < 1; i++) {

      try {
         if(!liveData && !storedData) {
            liveData = await scraper.scrapeURL(categories[i]);
            storedData = await controllers[i]();
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

        diff[categories[i]] = hasChanges;
        liveData = null;
        storedData = null;
      } catch(err) {
         console.error(err);

         break;
      };

   }

   return diff;
};

module.exports = exports;