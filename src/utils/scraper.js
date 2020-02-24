const puppeteer = require('puppeteer');
require('dotenv').config()

// globals
const URL = process.env.TARGET_URL;

exports.scrapeURL = async () => {
   let count = 1;
   const shoeCount = [];
   const data = [];

   const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
   });

   console.log(await browser.version());

   // open a new page
   const page = await browser.newPage();

   // recurrsively load each page 
   // load url
   await (async function evaluate() {
      await page.goto(`${URL}?p=${count}`, {waitUntil: "networkidle0"});

      const selectors = {
         sizes: '.product-item-details > div:nth-child(3)',
         names: '.product-item-details > strong.name'
      }

      await page.waitForSelector(selectors.sizes);

      const html = await page.evaluate((selectors) => {
         // document.querySelector("[data-product-id='16750']")
         
         const sneakers = [];
         
         // get sneaker sizes
         const iterable_one = Array.from(document.querySelectorAll(selectors.sizes));

         iterable_one.map((el) => {
            const sneaker = {};
            const sizes = [];
            const iterable_two = Array.from(el.children[0].querySelector('.swatch-attribute-options').querySelectorAll('.swatch-option'));
            const productId = el.previousElementSibling.getAttribute('data-product-id');

            iterable_two.map(el => {
               sizes.push(el.innerText.trim());
            });

            sneaker['productId'] = productId;
            sneaker['sizes'] = sizes;
            sneakers.push(sneaker);
         });

         // get sneaker name
         const iterable_three = Array.from(document.querySelectorAll(selectors.names));
         
         iterable_three.map((el) => {
            const currentId = el.nextElementSibling.getAttribute('data-product-id');
            
            const targetIndex = sneakers.findIndex(sneaker => sneaker.productId == currentId);
            sneakers[targetIndex]['name'] = el.innerText.trim();
         });

         const toolbar_amount = document.querySelector('.toolbar-amount').innerText.trim().split(' ');
         return [sneakers, toolbar_amount];

      }, selectors);

      data.push(html[0]);
      shoeCount.push(html[1][html[1].length-1]);

      if(JSON.parse(shoeCount[0]) <= data.flat().length) {
         return;
      }
      // recurrsive condition
      if(count < 3) {
         count++;
         return await evaluate();
      } else return;
   })();

   await browser.close();
   return data.flat();
};

module.exports = exports;