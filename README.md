## AJEBO - product tracker for e-commerce store

### DESCRIPTION
> This is a simple Nodejs web scraping tool that runs a task scheduler(cron) which mines product information (particulary sneakers from an e-commerce store) to check for consistency in sneaker sizes. If there's any inconsistency, the server send an email to notify the user

### TOOLS
* Server - NodeJS
* Headless Browser - Puppeteer
* Database - MongoDB
* ODM - Mongoose
* Message Queue - RabbitMQ
* Email Automation - Nodemailer + Sendgrid
* CLI tool - Inquirer
* Cloud PaaS - Heroku

### TASKS
- [x] Scaffold application
- [x] Install dependencies
- [x] Initialize git
- [x] Setup express server
- [x] Setup config files
- [x] Connect to database server
- [x] Create scraper function
- [x] Create database model and controller
- [x] Implement CRUD functions
- [x] Load database with mock data
- [x] Manually test tracking process with mock data
- [x] Setup email automation
- [x] Setup task scheduler
- [x] Load database with realtime data
- [x] Test app in production env
- [x] Abstract heavy tasks to workers - setup RabbitMq with amqp
- [x] Create CLI tool for running database updates
- [ ] Write suitable tests -- in progress
- [ ] Deploy to production
