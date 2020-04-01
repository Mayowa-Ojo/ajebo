// control consumer actions
const { checkDiff } = require("../utils/check_diff");

exports.distribute = async function (index) {
   const categories = [
      "sneakers",
      "anthem-jackets",
      "training-kits",
      "tracksuits"
   ]

   const res = await checkDiff(categories[index]);

   return [res, categories[index]];
}