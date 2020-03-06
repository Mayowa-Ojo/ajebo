const inquirer = require('inquirer');
const ora = require('ora');
const { getSneakers, getSneaker, updateSneaker } = require('../database/sneaker_controller');

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
         choices: [`create ${glyphs.edit}`, `read ${glyphs.search}`, `update ${glyphs.update}`, `delete ${glyphs.delete}`],
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
               {name: 'sizes', checked: true}
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
      if(answers.read.includes('find_one')) {
         prompt(read[1], function({ find_one: id }) {
            // validate input
            if(!validateData('id', id).isValidLength) {
               log('invalid input...');
               exit(0);
            }
            
            getSneaker(id).then(res => {
               if(res == null) {
                  log('Product not found');
                  exit(0);
                  // return;
               }
               log(res);
               exit(0);
            }).catch(err => console.error(`Error: ${err}`));
         });
      } else {
         // log('fetching data...')
         
         getSneakers().then(res => {
            log(res);
            const [spinner, stop] = loadingSpinner('Fetching data...', 'dots', 'yellow', true, '\nDone.');
            stop(spinner);
            // exit(0);
         }).catch(err => console.error(err));
      }
   });
};

function updateDatabase({update}) {

   prompt(update, function(answers) {
      const { update_id: id, update_fields, update_value } = answers;
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
            // log(update_value.split(','))
            const sizes = update_value.split(',');
            // All inputs valid: run database query
            updateSneaker(id, { sizes })
               .then(res => {
                  log(`product updated...[>] \n ${res}`);
                  exit(0);
               })
               .catch(err => console.error(err));
      }
      // update database
      return;
   });
};

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
      const isValidLength = data.length == 5;
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