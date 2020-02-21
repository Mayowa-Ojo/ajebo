const puppeteer = require('puppeteer');
require('dotenv').config()

// globals
const URL = process.env.TARGET_URL;
const { log } = console;

exports.scrapeURL = async () => {
   const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
   });

   console.log(await browser.version());

   // open a new page
   const page = await browser.newPage();

   // load url
   await page.goto(URL, {waitUntil: "networkidle0"});

   const selectors = {
      sizes: '.product-item-details > div:nth-child(3)',
      names: '.product-item-details > strong.name'
   }

   await page.waitForSelector(selectors.sizes);

   const html = await page.evaluate((selectors) => {
      // document.querySelector("[data-product-id='16750']")
      
      function getSneakerInfo() {
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
            const currentId = el.nextElementSibling.getAttribute('data-product-id')
            
            const targetIndex = sneakers.findIndex(sneaker => sneaker.productId == currentId)
            sneakers[targetIndex]['name'] = el.innerText.trim()
         })

         return sneakers;
      }

      return getSneakerInfo();
   }, selectors);

   
   await browser.close();
   return html;
};

module.exports = exports;