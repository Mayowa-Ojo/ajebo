const inquirer = require('inquirer');
const ora = require('ora');
const { getSneakers } = require('../database/sneaker_controller');

require('../config/database_config');
// globals
const args = process.argv.slice(2);

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
            message: `Provide an id for the product: [_id or productId] \n ${glyphs.arrow}`
         }
      ],
      update: [
         {
            name: 'update_id',
            type: 'input',
            message: `Provide an id for the product: [_id or productId] \n ${glyphs.arrow}`
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
            message: `Enter the updated value(s): [name, [sizes]] \n ${glyphs.arrow}`
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
                     console.log('inserting into database...');
                     break;
                  case route_one.includes('read'):
                     // console.log('reading database...')
                     readDatabase(questions.step_four);
                     break;
                  case route_one.includes('update'):
                     // console.log('updating database item...')
                     updateDatabase(questions.step_four);
                     break;
                  case route_one.includes('delete'):
                     console.log('deleting database item...');
                     break;
               }
            });
         } else {
            // launch headless browser
            prompt(questions.step_three[1], function(answers) {
               console.log('launching headless browser...');
            });
         }
      });
   } else {
      console.log('Here\'s a list of commands and flags with definitions');
   }
});

function readDatabase({read}) {

   prompt(read[0], function(answers) {
      if(answers.read.includes('find_one')) {
         prompt(read[1], function(answers) {
            console.log(`id: ${answers.find_one}`);
         });
      } else {
         // console.log('fetching data...')
         
         getSneakers().then(res => {
            console.log(res);
            const [spinner, stop] = loadingSpinner('Fetching data...', 'dots', 'yellow', true);
            stop(spinner);
            return;
         });
      }
   });
};

function updateDatabase({update}) {

   prompt(update, function(answers) {
      console.log(answers);
   });
};

function prompt(question, callback) {

   return inquirer.prompt(question).then(answers => {
      callback(answers);
   });
};

function loadingSpinner(text, spinner, color, prefix, successMsg) {
   let start;
   let stop = (instance) => setTimeout(() => {instance.succeed(successMsg)}, 1000);
   
   if(prefix) {
      start = ora({prefixText: text, color, spinner}).start();
      return [start, stop];
   }

   start = ora({text, color, spinner}).start();
   return [start, stop];
};