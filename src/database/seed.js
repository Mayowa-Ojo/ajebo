const Sneaker = require('./sneakers/model');
const Tracksuit = require('./tracksuits/model');
const TrainingKit = require('./training_kits/model');
const AnthemJacket = require('./anthem_jackets/model');

/**
 * seed data
 */

const data = [
  {
    productId: '10902',
    sizes: [ 'S' ],
    name: 'Real Madrid Anthem Jackets | Black'
  },
  {
    productId: '10887',
    sizes: [ 'M' ],
    name: 'Paris Saint Germain Anthem Jackets | Black'
  },
  {
    productId: '10882',
    sizes: [ 'S' ],
    name: 'Barcelona Anthem Jackets | Navy Blue'
  },
  {
    productId: '10877',
    sizes: [ 'S', 'M' ],
    name: 'Arsenal Anthem Jackets | Navy Blue'
  },
  {
    productId: '10872',
    sizes: [ 'M', 'L' ],
    name: 'Manchester United Anthem Jackets | Pink'
  },
  {
    productId: '10862',
    sizes: [ 'M' ],
    name: 'Arsenal Anthem Jackets | Green'
  },
  {
    productId: '10857',
    sizes: [ 'S' ],
    name: 'Chelsea Anthem Jackets | Blue'
  },
  {
    productId: '7464',
    sizes: [ 'XL' ],
    name: 'Nike Sweat Shirt | Navy Blue'
  }
];


(async function (data) {
   try {
      await AnthemJacket.insertMany(data);
      console.log('done')
   } catch (err) {
      console.error(err)
   };

})(data);
