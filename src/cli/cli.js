#!/bin/env node

const inquirer = require('inquirer');
const ora = require('ora');
const sneakerControllers = require('../database/sneakers/controller');
const anthemJacketControllers = require("../database/anthem_jackets/controller");
const trainingKitControllers = require("../database/training_kits/controller");
const tracksuitControllers = require("../database/tracksuits/controller");

// globals
const args = process.argv.slice(2)[0];
const { log } = console;
const { exit } = process;

// check node env
if(args == '--dev') {
   require('../config/database_config').connect('dev');
} else {
   require('../config/database_config').connect('prod');
}

const glyphs = {
   search: '',
   arrow: '',
   edit: '',
   cli: '',
   database: '',
   delete: '',
   update: '',
   browser: '',
   info: ''
}

const questions = {
   step_one: [
      {
         name: 'welcome',
         type: 'input',
         message: `${glyphs.info} Welcome to Ajebo cli [v1.0] ${glyphs.cli}\n Enter -h for help or -list for a list of available commands: \n ${glyphs.arrow}`
      }
   ],
   step_two: [
      {
         name: 'route',
         type: 'list',
         message: 'Select which route you\'d like to take: ',
         choices: [`run database query ${glyphs.database}`, `launch headless browser ${glyphs.browser}`],
         default: 'database query'
      }
   ],
   step_three: [
      {
         name: 'route_one',
         type: 'list',
         message: 'Select an operation',
         choices: [
            `create ${glyphs.edit}`,
            `read ${glyphs.search}`,
            `update ${glyphs.update}`,
            `update_many ${glyphs.update}`,
            `update_all ${glyphs.update}`,
            `delete ${glyphs.delete}`
         ],
         default: 'read'
      },
      {
         name: 'route_two',
         type: '',
         message: ''
      }
   ],
   step_four: {
      read: [
         {
            name: 'category', 
            type: 'list', 
            message: 'Select a product category.', 
            choices: ['sneakers', 'anthem-jackets', 'tracksuits', 'training-kits'], 
            default: 'sneakers'
         },
         {
            name: 'read', 
            type: 'list', 
            message: 'Do you want to run a find_one or find_all command? ', 
            choices: ['find_one', 'find_all'], 
            default: 'find_all'
         },
         {
            name: 'find_one',
            type: 'input',
            message: `Provide an id for the product: [_id or productId]<string> \n ${glyphs.arrow}`
         }
      ],
      update: [
         {
            name: 'category', 
            type: 'list', 
            message: 'Select a product category.', 
            choices: ['sneakers', 'anthem-jackets', 'tracksuits', 'training-kits'], 
            default: 'sneakers'
         },
         {
            name: 'update_id',
            type: 'input',
            message: `Provide an id for the product: [_id or productId]<string> \n ${glyphs.arrow}`
         },
         {
            name: 'update_fields',
            type: 'checkbox',
            message: 'Select fields to update',
            choices: [
               {name: 'name'},
               {name: 'sizes', checked: true},
               {name: 'stock'}
            ]
         },
         {
            name: 'update_value',
            type: 'input',
            message: `Enter the update value(s): name? <string>, sizes List<string> \n ${glyphs.arrow}`
         }
      ],
      update_many: [
         {
            name: 'category', 
            type: 'list', 
            message: 'Select a product category.', 
            choices: ['sneakers', 'anthem-jackets', 'tracksuits', 'training-kits'], 
            default: 'sneakers'
         },
         {
            name: 'update_fields',
            type: 'checkbox',
            message: 'Select fields to update',
            choices: [
               {name: 'name'},
               {name: 'sizes', checked: true},
               {name: 'stock'}
            ]
         },
         {
            name: 'update_value',
            type: 'editor',
            message: `Enter an array of ids and update value(s): name? <string>, sizes List<string> \n ${glyphs.arrow}`
         }
      ],
      update_all: [
         {
            name: 'category', 
            type: 'list', 
            message: 'Select a product category.', 
            choices: ['sneakers', 'anthem-jackets', 'tracksuits', 'training-kits'], 
            default: 'sneakers'
         },
         {
            name: 'update_fields',
            type: 'checkbox',
            message: 'Select fields to update',
            choices: [
               {name: 'name'},
               {name: 'sizes', checked: true},
               {name: 'stock'}
            ]
         },
         {
            name: 'update_value',
            type: 'input',
            message: `Enter the update value(s): name? <string>, sizes List<string> \n ${glyphs.arrow}`
         }
      ]
   }
};

prompt(questions.step_one, function(answers) {

   if(answers.welcome == '-list') {
      // list available commands
      prompt(questions.step_two, function(answers) {

         if(answers.route.includes('run database query')) {
            // prompt user to select database query
            prompt(questions.step_three[0], function(answers) {
               const { route_one } = answers;

               switch(Boolean(route_one)) {
                  case route_one.includes('create'):
                     log('inserting into database...');
                     break;
                  case route_one.includes('read'):
                     // log('reading database...')
                     readDatabase(questions.step_four);
                     break;
                  case route_one.includes('update_many'):
                     // log('updating database item...')
                     bulkUpdateDatabase(questions.step_four);
                     break;
                  case route_one.includes('update_all'):
                     // log('updating database item...')
                     updateAll(questions.step_four);
                     break;
                  case route_one.includes('update'):
                     // log('updating database item...')
                     updateDatabase(questions.step_four);
                     break;
                  case route_one.includes('delete'):
                     log('deleting database item...');
                     break;
               }
            });
         } else {
            // launch headless browser
            prompt(questions.step_three[1], function(answers) {
               log('launching headless browser...');
            });
         }
      });
   } else {
      log('Here\'s a list of commands and flags with definitions');
   }
});

function readDatabase({read}) {

   prompt(read[0], function(answers) {
      const category = answers.category;

      prompt(read[1], function(answers) {

         if(answers.read.includes('find_one')) {

            const controller = mapCategoryToController("read", category);

            prompt(read[2], function({ find_one: id }) {
               // validate input
               if(!validateData('id', id).isValidLength) {
                  log('invalid input...');
                  exit(0);
               }
               
               controller(id).then(res => {
                  if(res == null) {
                     log('Product not found');
                     exit(0);
                     // return;
                  }
                  log(res);
                  exit(0);
               }).catch(err => console.error(`Error: ${err}`));
            });
         } 
         
         if(answers.read.includes('find_all')) {
            const controller = mapCategoryToController("readAll", category)
            
            controller().then(res => {
               log(res);
               const [spinner, stop] = loadingSpinner('Fetching data...', 'dots', 'yellow', true, '\nDone.');
               stop(spinner);
               // exit(0);
            }).catch(err => console.error(err));
         }
      })
   });
};

function updateDatabase({update}) {

   prompt(update, function(answers) {
      const { category, update_id: id, update_fields, update_value } = answers;
      const controller = mapCategoryToController("update", category);
      // validate data
      switch(Boolean(0)) {
         case validateData('id', id).isValidLength && validateData('id', id).isValidType:
            log('invalid input at <id>...');
            exit(0);
            break;
         case validateData('name', update_value[0]).isValidType:
            log('invalid input at <name>...');
            exit(0);
            break;
         case validateData('sizes', update_value[1]).isNotEmpty && validateData('sizes', update_value[1]).isValidType:
            log('invalid input at <sizes>...');
            exit(0);
            break;
         default:
            const update = update_fields == 'sizes' ? update_value.split(',') : update_value
            
            // All inputs valid: run database query
            console.log(`update-field: ${update_fields}, update: ${update}`)
            controller(id, update_fields, update)
               .then(res => {
                  log(`[>] ${res}`);
                  exit(0);
               })
               .catch(err => console.error(err));
      }
      // update database
      return;
   });
};

/*
Data format:
[
   {
      "id": "15830",
      "sizes": "[43,45]"
   },
   {
      "id": "15818",
      "sizes": "[42]"
   },
   {
      "id": "15812",
      "sizes": "[47,44,46]"
   }
]
[
   {
      "id": "15830",
      "stock": "out-of-stock"
   },
   {
      "id": "15818",
      "stock": "out-of-stock"
   }
]
*/
/**
 * update many products
 * @param {*} param
 */
function bulkUpdateDatabase({update_many}) {

   prompt(update_many, function(answers) {
      const { category, update_fields, update_value } = answers;
      const controller = mapCategoryToController("bulkUpdate", category);
      parsedData = JSON.parse(update_value);

      // pass data to controller
      controller(update_fields, parsedData)
         .then(res => {
            log(`[>] ${res}`);
            exit(0);
         })
         .catch(err => console.error(err));
   });
}

function updateAll({update_all}) {

   prompt(update_all, function(answers) {
      const { category, update_fields, update_value } = answers;
      const controller = mapCategoryToController("updateAll", category);
      const update = update_fields == 'sizes' ? update_value.split(',') : update_value
      
      controller(update_fields, update)
         .then(res => {
            log(`[>] ${res}`);
            exit(0);
         })
         .catch(err => console.error(err));
   });
}

/**
 * 
 * @param {object} question - prompt options 
 * @param {function} callback - function to execute
 * @returns {function} - return value from inquirer.prompt
 */
function prompt(question, callback) {

   return inquirer.prompt(question).then(answers => {
      callback(answers);
   });
};

/**
 * 
 * @param {string} text - message to display
 * @param {string} spinner - ?type of spinner(e.g 'dots')
 * @param {string} color - ?spinner color
 * @param {boolean} prefix - ?show text before spinner
 * @param {string} successMsg - ?message to pass to success method
 * @returns {array} - array containing the start handler and stop method
 */
function loadingSpinner(text, spinner, color, prefix, successMsg) {
   let start;
   let stop = (instance) => setTimeout(() => {
      instance.succeed(successMsg);
      exit(0);
   }, 1000);
   
   if(prefix) {
      start = ora({prefixText: text, color, spinner}).start();
      return [start, stop];
   }

   start = ora({text, color, spinner}).start();
   return [start, stop];
};

/**
 * 
 * @param {string} type - type of validation to run
 * @param {string} data - parameter to validate
 * @returns {object,string} - returns isValid boolean 
 */
function validateData(type=null, data) {
   if(type == null) {
      return new Error('must specify validator type');
   }

   if(type == 'id') {
      const isValidLength = data.length == 4 || data.length == 5;
      const isValidType = typeof data == 'string';
      return {isValidLength, isValidType};
   }

   if(type == 'name') {
      const isValidType = typeof data == 'string';
      return isValidType;
   }

   if(type == 'sizes') {
      const isNotEmpty = data.length > 0;
      const isValidType = typeof data == 'string';
      return {isNotEmpty, isValidType};
   }
};

function mapCategoryToController(query, category) {
   const categories = {
      read: {
         "sneakers": sneakerControllers.getSneaker,
         "anthem-jackets": anthemJacketControllers.getAnthemJacket,
         "training-kits": trainingKitControllers.getTrainingKit,
         "tracksuits": tracksuitControllers.getTrackSuit
      },
      readAll: {
         "sneakers": sneakerControllers.getSneakers,
         "anthem-jackets": anthemJacketControllers.getAnthemJackets,
         "training-kits": trainingKitControllers.getTrainingKits,
         "tracksuits": tracksuitControllers.getTrackSuits
      },
      update: {
         "sneakers": sneakerControllers.updateSneaker,
         "anthem-jackets": anthemJacketControllers.updateAnthemJacket,
         "training-kits": trainingKitControllers.updateTrainingKit,
         "tracksuits": tracksuitControllers.updateTrackSuit
      },
      updateAll: {
         "sneakers": sneakerControllers.updateAllSneakers,
         "anthem-jackets": anthemJacketControllers.updateAllAnthemJackets,
         "training-kits": trainingKitControllers.updateAllTrainingKits,
         "tracksuits": tracksuitControllers.updateAllTracksuits
      },
      bulkUpdate: {
         "sneakers": sneakerControllers.bulkUpdateSneakers,
         "anthem-jackets": anthemJacketControllers.bulkUpdateAnthemJackets,
         "training-kits": trainingKitControllers.bulkUpdateTrainingKits,
         "tracksuits": tracksuitControllers.bulkUpdateTrackSuits
      }
   }

   return categories[query][category];
}