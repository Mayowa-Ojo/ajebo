const inquirer = require('inquirer');

const args = process.argv.slice(2);

const glyphs = {
   search: '',
   arrow: '',
   edit: '',
   cli: ''
}
const questions = {
   step_one: [
      {
         name: 'welcome',
         type: 'input',
         message: `Welcome to Ajebo cli [v1.0] ${glyphs.cli}\n Enter -h for help or -list for a list of available commands: \n ${glyphs.arrow}`
      }
   ],
   step_two: [
      {
         name: 'route',
         type: 'list',
         message: 'Select which route you\'d like to take: ',
         choices: ['run database query', 'launch headless browser'],
         default: 'database query'
      }
   ],
   step_three: [
      {
         name: 'route_one',
         type: 'list',
         message: 'Select an operation',
         choices: ['create', `read ${glyphs.search}`, 'update', 'delete'],
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
         if(answers.route == 'run database query') {
            // prompt user to select database query
            prompt(questions.step_three[0], function(answers) {
               switch(answers.route_one) {
                  case 'create':
                     console.log('inserting into database...');
                     break;
                  case 'read':
                     // console.log('reading database...')
                     readDatabase(questions.step_four);
                     break;
                  case 'update':
                     // console.log('updating database item...')
                     updateDatabase(questions.step_four);
                     break;
                  case 'delete':
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
      if(answers.read == 'find_one') {
         prompt(read[1], function(answers) {
            console.log(
               JSON.stringify(
                  {
                     _id: 'abnbdyt274672783t76y',
                     name: 'Adidas FOG | Black',
                     sizes: ['42', '44'],
                     productId: answers.find_one
                  }
               )
            );
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