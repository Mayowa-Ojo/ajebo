const Sneaker = require('./sneaker_model');
/**
 * seed data
 */

const data = [
   {
     "productId": "17770",
     "sizes": [
       "43"
     ],
     "name": "Adidas Originals NBHD | Black"
   },
   {
     "productId": "17762",
     "sizes": [
       "42"
     ],
     "name": "Adidas Originals NBHD | Navy"
   },
   {
     "productId": "17711",
     "sizes": [
       "44",
       "43",
       "42",
       "41",
       "45"
     ],
     "name": "Lebron XVI Low EP Camo"
   },
   {
     "productId": "16750",
     "sizes": [
       "44",
       "42",
       "41"
     ],
     "name": "Adidas Original Sneakers | Sky Blue"
   },
   {
     "productId": "16491",
     "sizes": [
       "43"
     ],
     "name": "Puma Cali 0 Trainers | White Black"
   },
   {
     "productId": "16486",
     "sizes": [
       "44"
     ],
     "name": "Reebok LX CO-OP | Black White"
   },
   {
     "productId": "16468",
     "sizes": [
       "44",
       "43",
       "42"
     ],
     "name": "Nike Air Max Axis Takashi Shield | Black Gold"
   },
   {
     "productId": "16462",
     "sizes": [
       "44",
       "43",
       "42",
       "41"
     ],
     "name": "Kyrie 5 EP | Black Gold"
   },
   {
     "productId": "16455",
     "sizes": [
       "44",
       "43",
       "42"
     ],
     "name": "Kyrie 5 EP | Cream Purple"
   },
   {
     "productId": "16448",
     "sizes": [
       "43",
       "44"
     ],
     "name": "Original Yeezy Season 7 | Grey Blue White"
   },
   {
     "productId": "16442",
     "sizes": [
       "44",
       "43",
       "42",
       "41"
     ],
     "name": "The ASICS GEL-Lyte III | Washed Denim"
   },
   {
     "productId": "16437",
     "sizes": [
       "42"
     ],
     "name": "Nike Mercurial 97 | Gray Blue"
   },
   {
     "productId": "16431",
     "sizes": [
       "43",
       "41"
     ],
     "name": "Off-White x Nike Zoom Terra Kiger 5 In Black/Pink"
   },
   {
     "productId": "16425",
     "sizes": [
       "41"
     ],
     "name": "UA Curry 6 All Black"
   },
   {
     "productId": "16411",
     "sizes": [
       "44"
     ],
     "name": "Travis Scott X Air Jordan 1 Low"
   },
   {
     "productId": "16115",
     "sizes": [
       "44"
     ],
     "name": "Puma Future Cat Leather SF Suede | Black Gold"
   },
   {
     "productId": "16109",
     "sizes": [
       "42"
     ],
     "name": "Puma Future Cat Leather SF Suede | Black Silver"
   },
   {
     "productId": "16097",
     "sizes": [
       "42"
     ],
     "name": "New Balance MS574VD | Grey Black Blue"
   },
   {
     "productId": "16084",
     "sizes": [
       "43"
     ],
     "name": "Nike Lunar Force 1 Duckboot Low | White Black Blue"
   },
   {
     "productId": "16078",
     "sizes": [
       "42",
       "41"
     ],
     "name": "Puma Cali 0 Trainers |Black"
   },
   {
     "productId": "16048",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max Flair Futura 270 | Black Gold"
   },
   {
     "productId": "16042",
     "sizes": [
       "44",
       "42"
     ],
     "name": "New Balance MFCFLLV Sneakers | Black Pink"
   },
   {
     "productId": "16036",
     "sizes": [
       "43",
       "41"
     ],
     "name": "Under Armour Sling Flex Rise | Black"
   },
   {
     "productId": "16012",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max Flair Futura 270 | Chocolate Orange"
   },
   {
     "productId": "15976",
     "sizes": [
       "43",
       "42",
       "41"
     ],
     "name": "Patta x Nike Air Max Hybrid 95/90 | Black"
   },
   {
     "productId": "15970",
     "sizes": [
       "44",
       "42"
     ],
     "name": "Patta x Nike Air Max Hybrid 95/90 | Coffee Green"
   },
   {
     "productId": "15958",
     "sizes": [
       "43"
     ],
     "name": "Nike Odyssey Rect Shield | Black"
   },
   {
     "productId": "15952",
     "sizes": [
       "42",
       "41"
     ],
     "name": "Lebron XVI Low EP | Black Blue"
   },
   {
     "productId": "15940",
     "sizes": [
       "44"
     ],
     "name": "Puma Cali 0 Trainers |White"
   },
   {
     "productId": "15934",
     "sizes": [
       "44"
     ],
     "name": "NIke EXP - Z07 | Black"
   },
   {
     "productId": "15928",
     "sizes": [
       "43"
     ],
     "name": "Nike Airforce 1'07 LV8 Utility | White"
   },
   {
     "productId": "15895",
     "sizes": [
       "45",
       "42",
       "41"
     ],
     "name": "New Balance MSX90SID Sneakers | Multicolor"
   },
   {
     "productId": "15882",
     "sizes": [
       "42",
       "43"
     ],
     "name": "Under Armour Scorpio 3 | Black"
   },
   {
     "productId": "15860",
     "sizes": [
       "46"
     ],
     "name": "The 10: NIke x Off White Air 720 90 | Black White"
   },
   {
     "productId": "15848",
     "sizes": [
       "44"
     ],
     "name": "Under Armour Tempo Hybrid 2 | Black Pink"
   },
   {
     "productId": "15830",
     "sizes": [
       "45",
       "43"
     ],
     "name": "Under Armour Scorpio 3 | Biege"
   },
   {
     "productId": "15818",
     "sizes": [
       "41"
     ],
     "name": "The 10: NIke x Off White Air 720 90"
   },
   {
     "productId": "15812",
     "sizes": [
       "42"
     ],
     "name": "New Balance MSX90SNL Sneakers"
   },
   {
     "productId": "15800",
     "sizes": [
       "42"
     ],
     "name": "New Balance MRL247WU Sneakers | Black"
   },
   {
     "productId": "15794",
     "sizes": [
       "44",
       "43"
     ],
     "name": "New Balance MRL247WS Sneakers | Grey"
   },
   {
     "productId": "15788",
     "sizes": [
       "44"
     ],
     "name": "New Balance MRL247WT Sneakers | Brown"
   },
   {
     "productId": "15782",
     "sizes": [
       "45",
       "43",
       "41"
     ],
     "name": "New Balance MRL247HE Sneakers | Beige"
   },
   {
     "productId": "15020",
     "sizes": [
       "43"
     ],
     "name": "Nike Airmax DLX 2019 | Black Red"
   },
   {
     "productId": "14326",
     "sizes": [
       "44",
       "41"
     ],
     "name": "NIke Air Jordan 4 Retro | Black White"
   },
   {
     "productId": "14320",
     "sizes": [
       "43"
     ],
     "name": "Puma Future Cat Leather SF | Black Red"
   },
   {
     "productId": "14268",
     "sizes": [
       "41"
     ],
     "name": "Nike Air Max 97/ BW | Persian Violet"
   },
   {
     "productId": "14238",
     "sizes": [
       "45"
     ],
     "name": "Puma Future Cat Leather SF | Black Yellow"
   },
   {
     "productId": "14226",
     "sizes": [
       "41"
     ],
     "name": "NIke Zoom Vomero 5/ACW | Black"
   },
   {
     "productId": "14213",
     "sizes": [
       "41"
     ],
     "name": "Adidas Sharks | Black"
   },
   {
     "productId": "13622",
     "sizes": [
       "45",
       "44",
       "41"
     ],
     "name": "Nike Air Max | Multicolor"
   },
   {
     "productId": "13616",
     "sizes": [
       "43",
       "42"
     ],
     "name": "Nike Air Max Just Do It | Black"
   },
   {
     "productId": "13610",
     "sizes": [
       "44",
       "41"
     ],
     "name": "Samba OG Shoes | Black"
   },
   {
     "productId": "13604",
     "sizes": [
       "42"
     ],
     "name": "Nike LeBron Witness III | Black Red"
   },
   {
     "productId": "13560",
     "sizes": [
       "45",
       "41"
     ],
     "name": "Air Force 1 Mid 07 LV8"
   },
   {
     "productId": "13554",
     "sizes": [
       "44"
     ],
     "name": "Air Vapormax 2019 | Black Metallic Gold"
   },
   {
     "productId": "13529",
     "sizes": [
       "44"
     ],
     "name": "Nike Ambassador IX | Multicolor"
   },
   {
     "productId": "13511",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max 97 UL '17 SE Sneakers"
   },
   {
     "productId": "13461",
     "sizes": [
       "42"
     ],
     "name": "Nike Airmax DLX Green"
   },
   {
     "productId": "13449",
     "sizes": [
       "44"
     ],
     "name": "Nike Air Force 1 DUMR"
   },
   {
     "productId": "13436",
     "sizes": [
       "41",
       "42"
     ],
     "name": "Under Armour Stephen Curry 6 Black Gold Shoes"
   },
   {
     "productId": "13413",
     "sizes": [
       "43"
     ],
     "name": "Nike Airmax DLX 2019 | Black"
   },
   {
     "productId": "13401",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Skylon II | Multicolor"
   },
   {
     "productId": "13395",
     "sizes": [
       "42",
       "41"
     ],
     "name": "Samba OG Shoes"
   },
   {
     "productId": "13382",
     "sizes": [
       "43",
       "42",
       "41"
     ],
     "name": "Under Armour Curry 6 Fox Theater Black Grey Orange"
   },
   {
     "productId": "13361",
     "sizes": [
       "41"
     ],
     "name": "Nike Air Foamposite Pro | Gold Black"
   },
   {
     "productId": "13354",
     "sizes": [
       "44"
     ],
     "name": "Air Jordan 4 Retro | Grey Black Noir"
   },
   {
     "productId": "13348",
     "sizes": [
       "42"
     ],
     "name": "NIke Airmax 720 | Black"
   },
   {
     "productId": "13125",
     "sizes": [
       "41"
     ],
     "name": "Alexander Mc Queen Sneakers | Black"
   },
   {
     "productId": "13124",
     "sizes": [
       "42"
     ],
     "name": "Adidas Cimacool Vent M"
   },
   {
     "productId": "13099",
     "sizes": [
       "44"
     ],
     "name": "Air Jordan XXXIII PF | Desert Ore/White/Black/Dark Concord"
   },
   {
     "productId": "12594",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max 97 TN | Black & Gold"
   },
   {
     "productId": "12565",
     "sizes": [
       "45"
     ],
     "name": "NIke Air Max 95 HYP PRM 20 Anniversary"
   },
   {
     "productId": "12552",
     "sizes": [
       "41"
     ],
     "name": "Crazy Flight Bounce | Red"
   },
   {
     "productId": "12370",
     "sizes": [
       "43"
     ],
     "name": "Nike Sneakers Undercover/Element 87 | Black"
   },
   {
     "productId": "11879",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max 97 Plus | White"
   },
   {
     "productId": "11873",
     "sizes": [
       "42",
       "44"
     ],
     "name": "Nike Air Max 97 Plus | Black"
   },
   {
     "productId": "11855",
     "sizes": [
       "44"
     ],
     "name": "Nike Airmax Plus Se Just Do It"
   },
   {
     "productId": "11825",
     "sizes": [
       "42"
     ],
     "name": "Adidas Pure Boost Element | Black White"
   },
   {
     "productId": "11735",
     "sizes": [
       "45"
     ],
     "name": "Nike Air Max 97 SE | Silver Gold"
   },
   {
     "productId": "11725",
     "sizes": [
       "43"
     ],
     "name": "Nike Blazer Mid Rebel High Top"
   },
   {
     "productId": "11641",
     "sizes": [
       "42"
     ],
     "name": "Nike Classic Cortex Nylon 09"
   },
   {
     "productId": "11636",
     "sizes": [
       "42",
       "44",
       "43"
     ],
     "name": "Nike Pegasus 83 LTR"
   },
   {
     "productId": "11621",
     "sizes": [
       "42"
     ],
     "name": "Adidas Pure Boost Element"
   },
   {
     "productId": "11616",
     "sizes": [
       "44"
     ],
     "name": "Nike Mercurial TN | Black"
   },
   {
     "productId": "11565",
     "sizes": [
       "42",
       "45",
       "43"
     ],
     "name": "Nike M2K Tekno Mid Leather | Black"
   },
   {
     "productId": "11550",
     "sizes": [
       "44"
     ],
     "name": "Adidas Tubular M Running Sneakers"
   },
   {
     "productId": "11525",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Max Deluxe 97 UL '17 Black"
   },
   {
     "productId": "11177",
     "sizes": [
       "42"
     ],
     "name": "Nike Air Vapourmax | Black White"
   },
   {
     "productId": "10969",
     "sizes": [
       "43",
       "42"
     ],
     "name": "Nike Air Span 2 - White/Dust Grey/Fluorescent Red/ Black"
   },
   {
     "productId": "10963",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Span 2 - White/Dust Grey/Fluorescent Green/ Black"
   },
   {
     "productId": "10083",
     "sizes": [
       "42"
     ],
     "name": "Palladium Men's Pampa Flats Super Light Sneakers | All Black"
   },
   {
     "productId": "9621",
     "sizes": [
       "45",
       "44"
     ],
     "name": "Nike Air Vapormax Plus | Black White"
   },
   {
     "productId": "9348",
     "sizes": [
       "43"
     ],
     "name": "Adidas Originals F/1.4 PK Core Black"
   },
   {
     "productId": "8533",
     "sizes": [
       "43",
       "41"
     ],
     "name": "Adidas Cloudfoam QT Flex Shoes"
   },
   {
     "productId": "8464",
     "sizes": [
       "43"
     ],
     "name": "Nike Mens Air Max 97 UL 17 SE Sneakers | Khaki Beige"
   },
   {
     "productId": "8457",
     "sizes": [
       "42"
     ],
     "name": "Nike Mens Air Max 97 UL 17 SE Sneakers | Black"
   },
   {
     "productId": "7450",
     "sizes": [
       "43",
       "41"
     ],
     "name": "Jordan 4 Retro Kaws Black"
   },
   {
     "productId": "7360",
     "sizes": [
       "41"
     ],
     "name": "Nike Air Max 2017 | Grey & Black"
   },
   {
     "productId": "6835",
     "sizes": [
       "44",
       "43",
       "42"
     ],
     "name": "Nike Air Force 1 Low X Supreme"
   },
   {
     "productId": "6798",
     "sizes": [
       "43"
     ],
     "name": "Vans Off White Red Sneakers"
   },
   {
     "productId": "6762",
     "sizes": [
       "43"
     ],
     "name": "Nike Air Jordan V2 Low | Black"
   },
   {
     "productId": "6656",
     "sizes": [
       "42",
       "41"
     ],
     "name": "Nike Air Max 97 OG x UNDFTD | Black"
   },
   {
     "productId": "6605",
     "sizes": [
       "43"
     ],
     "name": "Nike Airmax Invigor Print | Black"
   },
   {
     "productId": "6533",
     "sizes": [
       "41"
     ],
     "name": "Air Jordan 32 'MJ Day' Surface"
   }
];

(async function (data) {
   try {
      await Sneaker.insertMany(data);
      console.log('done')
   } catch (err) {
      console.error(err)
   };

})(data);
