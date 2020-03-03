# terminal commands:
# start development server
start:
	nodemon src/server.js

# launch cli
cli:
	node src/cli/cli.js

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
