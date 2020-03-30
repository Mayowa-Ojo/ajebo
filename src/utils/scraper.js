const puppeteer = require('puppeteer');

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

// globals
const URL = process.env.TARGET_URL;
const mapProductType = {
   "sneakers": "shoes/sneakers",
   "anthem-jackets": "sports/anthem-jackets",
   "training-kits": "sports/training-kits",
   "tracksuits": "/sports/football-tracksuits"
}

exports.scrapeURL = async (productType) => {
   let count = 1;
   let shoeCount = 0;
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
      await page.goto(`${URL}${mapProductType[productType]}?p=${count}`, {waitUntil: "networkidle0", timeout: 0});

      const selectors = {
         sizes: '.product-item-details > div:nth-child(3)',
         names: '.product-item-details > strong.name'
      }

      await page.waitForSelector(selectors.sizes);

      const pageResponse = await page.evaluate((selectors) => {
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

      const [sneakers , toolbar_amount] = pageResponse
      data.push(sneakers);
      shoeCount = shoeCount + sneakers.length

      // check if all items fit in one page
      if(toolbar_amount.length == 2) {
         return
      }
      // recurrsive condition
      if(shoeCount < JSON.parse(toolbar_amount[3])) { // compare shoeCount with the total displayed in toolbar
         count++
         return await evaluate();
      }
      return;
   })();

   await browser.close();
   return data.flat()
};

module.exports = exports;

// run scrape in browser console
function browserScrape() {
   const selectors = {
      sizes: '.product-item-details > div:nth-child(3)',
      names: '.product-item-details > strong.name'
   }

   const sneakers = [];
         
   // get sneaker sizes
   const iterable_one = Array.from(document.querySelectorAll(selectors.sizes))
   iterable_one.map((el) => {
      const sneaker = {};
      const sizes = [];
      const iterable_two = Array.from(el.children[0].querySelector('.swatch-attribute-options').querySelectorAll('.swatch-option'));
      const productId = el.previousElementSibling.getAttribute('data-product-id')
      iterable_two.map(el => {
         sizes.push(el.innerText.trim());
      })
      sneaker['productId'] = productId;
      sneaker['sizes'] = sizes;
      sneakers.push(sneaker);
   })
   // get sneaker name
   const iterable_three = Array.from(document.querySelectorAll(selectors.names));
   
   iterable_three.map((el) => {
      const currentId = el.nextElementSibling.getAttribute('data-product-id');
      
      const targetIndex = sneakers.findIndex(sneaker => sneaker.productId == currentId);
      sneakers[targetIndex]['name'] = el.innerText.trim();
   });

   return sneakers
}