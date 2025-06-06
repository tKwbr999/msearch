check:
	make lint && make fmt-check

check-all:
	make lint && make fmt-check && make test

lint:
	npm run lint

fmt:
	npm run fmt

fmt-check:
	npm run fmt:check

test:
	npm test

test-unit:
	npm run test:unit

test-e2e:
	npm run test:e2e

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

dev:
	npm run dev

start:
	npm start
