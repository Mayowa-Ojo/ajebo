# terminal commands:
# start development server
start:
	nodemon src/server.js
dev:
	nodemon src/server.js --dev
test:
	npm test
# launch cli
cli:
	node src/cli/cli.js $(env)

# run rabbitmq consumer
rbmq-c:
	node src/workers/consumer.js

# run rabbitmq publisher
rbmq-p:
	node src/workers/publisher.js

# run npm install && save locally
# TODO: configure accept params
i-s:
	npm install --save
