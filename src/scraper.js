const puppeteer = require('puppeteer');

const URL = "https://ajebomarket.com/shoes/sneakers";
const { log } = console;

(async () => {
   const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
   });

   console.log(await browser.version());

   // open a new page
   const page = await browser.newPage();

   // load url
   await page.goto(URL);

   const html = await page.evaluate(() => {
      const sneakers = []
      document.querySelectorAll('.product-item-details > strong.name').forEach(sneaker => {
         sneakers.push({id: 1, name: sneaker.inenrText})
      })
      
      return sneaker_name;
   });

   log(await html);

   await browser.close();
})();
