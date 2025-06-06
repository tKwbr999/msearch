check:
	make lint && make fmt-check

lint:
	npm run lint

fmt:
	npm run fmt

fmt-check:
	npm run fmt:check

dev:
	npm run dev

start:
	npm start

check-all:
	make lint && make fmt-check
