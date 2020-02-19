const Sneaker = require('./sneaker_model');
/**
 * seed data
 */

const data = [
   {
     productId: '17770',
     sizes: [ '43', '42', '41', '40' ],
     name: 'Adidas Originals NBHD | Black'
   },
   {
     productId: '17762',
     sizes: [ '43', '42' ],
     name: 'Adidas Originals NBHD | Navy'
   },
   {
     productId: '17711',
     sizes: [ '45', '44', '43', '41' ],
     name: 'Lebron XVI Low EP Camo'
   },
   {
     productId: '16750',
     sizes: [ '44', '42', '41' ],
     name: 'Adidas Original Sneakers | Sky Blue'
   },
   {
     productId: '16491',
     sizes: [ '43' ],
     name: 'Puma Cali 0 Trainers | White Black'
   },
   {
     productId: '16486',
     sizes: [ '44' ],
     name: 'Reebok LX CO-OP | Black White'
   },
   {
     productId: '16468',
     sizes: [ '44', '43' ],
     name: 'Nike Air Max Axis Takashi Shield | Black Gold'
   },
   {
     productId: '16462',
     sizes: [ '44', '43', '42', '41' ],
     name: 'Kyrie 5 EP | Black Gold'
   },
   {
     productId: '16455',
     sizes: [ '44', '43', '42' ],
     name: 'Kyrie 5 EP | Cream Purple'
   },
   {
     productId: '16448',
     sizes: [ '43', '44' ],
     name: 'Original Yeezy Season 7 | Grey Blue White'
   },
   {
     productId: '16442',
     sizes: [ '44', '43', '42', '41' ],
     name: 'The ASICS GEL-Lyte III | Washed Denim'
   },
   {
     productId: '16437',
     sizes: [ '42' ],
     name: 'Nike Mercurial 97 | Gray Blue'
   },
   {
     productId: '16431',
     sizes: [ '43', '41' ],
     name: 'Off-White x Nike Zoom Terra Kiger 5 In Black/Pink'
   },
   { 
      productId: '16425', 
      sizes: [ '41' ], 
      name: 'UA Curry 6 All Black' 
   },
   {
     productId: '16411',
     sizes: [ '44' ],
     name: 'Travis Scott X Air Jordan 1 Low'
   },
   {
     productId: '16139',
     sizes: [ '45', '41' ],
     name: 'Reebok Classic Sneakers | White'
   },
   {
     productId: '16115',
     sizes: [ '44' ],
     name: 'Puma Future Cat Leather SF Suede | Black Gold'
   },
   {
     productId: '16109',
     sizes: [ '42' ],
     name: 'Puma Future Cat Leather SF Suede | Black Silver'
   },
   {
     productId: '16097',
     sizes: [ '42' ],
     name: 'New Balance MS574VD | Grey Black Blue'
   },
   {
     productId: '16084',
     sizes: [ '43' ],
     name: 'Nike Lunar Force 1 Duckboot Low | White Black Blue'
   },
   {
     productId: '16072',
     sizes: [ '44' ],
     name: 'Nike Air Max 90 | Black Gold'
   },
   {
     productId: '16042',
     sizes: [ '44' ],
     name: 'New Balance MFCFLLV Sneakers | Black Pink'
   },
   {
     productId: '16036',
     sizes: [ '41', '43' ],
     name: 'Under Armour Sling Flex Rise | Black'
   },
   {
     productId: '16012',
     sizes: [ '43' ],
     name: 'Nike Air Max Flair Futura 270 | Chocolate Orange'
   },
   {
     productId: '16000',
     sizes: [ '42' ],
     name: 'Nike Zoom Pegasus 35 Turbo | Light Cream'
   },
   {
     productId: '15976',
     sizes: [ '44', '43', '42', '41' ],
     name: 'Patta x Nike Air Max Hybrid 95/90 | Black'
   },
   {
     productId: '15970',
     sizes: [ '42' ],
     name: 'Patta x Nike Air Max Hybrid 95/90 | Coffee Green'
   },
   {
     productId: '15964',
     sizes: [ '44' ],
     name: 'Nike Air Vapormax 2019 | White Gold'
   },
   {
     productId: '15958',
     sizes: [ '43' ],
     name: 'Nike Odyssey Rect Shield | Black'
   },
   {
     productId: '15952',
     sizes: [ '41' ],
     name: 'Lebron XVI Low EP | Black Blue'
   },
   {
     productId: '15946',
     sizes: [ '40' ],
     name: 'Reebok Classic Club C | Black'
   },
   { 
      productId: '15940', 
      sizes: [ '44' ], 
      name: 'Puma Cali 0 Trainers |White' 
   },
   {
     productId: '15928',
     sizes: [ '43' ],
     name: "Nike Airforce 1'07 LV8 Utility | White"
   },
   {
     productId: '15902',
     sizes: [ '42' ],
     name: 'Adidas Harden Vol. 4 | Khaki Green'
   },
   {
     productId: '15895',
     sizes: [ '45', '42', '41' ],
     name: 'New Balance MSX90SID Sneakers | Multicolor'
   },
   {
     productId: '15882',
     sizes: [ '43', '42' ],
     name: 'Under Armour Scorpio 3 | Black'
   },
   {
     productId: '15848',
     sizes: [ '44' ],
     name: 'Under Armour Tempo Hybrid 2 | Black Pink'
   },
   {
     productId: '15830',
     sizes: [ '43', '42' ],
     name: 'Under Armour Scorpio 3 | Biege'
   },
   {
     productId: '15818',
     sizes: [ '41' ],
     name: 'The 10: NIke x Off White Air 720 90'
   },
   {
     productId: '15812',
     sizes: [ '42' ],
     name: 'New Balance MSX90SNL Sneakers'
   }
 ];

(async function(data) {
   try {
      await Sneaker.insertMany(data);
      console.log('done')
   } catch(err) {
      console.error(err)
   };

})(data);
