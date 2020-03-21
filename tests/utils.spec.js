const { checkDiff } = require('../src/utils/check_diff');


describe("test checkDiff function", () => {
   test('should return objects which have difference in data and null for missing data', async () => {
      const storedData = [
         {
            productId: '18488',
            sizes: [ '43' ],
            name: 'Puma Mercedes Amg Petronas Motorsport Kart Cat X White'
         },
         {
           productId: '18366',
           sizes: [ '43', '42', '41', '45', '44' ],
           name: 'Asics Tiger Gel PTG | White Blue Red'
         },
         {
           productId: '18360',
           sizes: [ '43', '42', '41', '47', '45', '44' ],
           name: 'Tommy Hilfiger Mens Rance3 Sneaker'
         },
         {
           productId: '18352',
           sizes: [ '41', '44', '43', '42' ],
           name: 'Puma G.V Special Sneakers Black and White'
         },
         {
           productId: '18341',
           sizes: [ '43', '42', '41', '45', '44' ],
           name: 'Adidas TY Shawn | White'
         }
      ];

      const liveData = [
         {
            productId: '18488',
            sizes: [ '43', '42' ],
            name: 'Puma Mercedes Amg Petronas Motorsport Kart Cat X White'
         },
         {
           productId: '18366',
           sizes: [ '43', '42', '41', '45', '44' ],
           name: 'Asics Tiger Gel PTG | White Blue Red'
         },
         {
           productId: '18352',
           sizes: [ '41', '44', '42' ],
           name: 'Puma G.V Special Sneakers Black and White'
         },
         {
           productId: '18341',
           sizes: [ '43', '42', '41', '45', '44' ],
           name: 'Adidas TY Shawn | White'
         }
      ];

      const changes = await checkDiff(liveData, storedData);

      expect(typeof changes).toBe('object');
      expect(changes[1].liveData).toBe(null);
      expect(changes.length).toBe(3);

   })
   
})
