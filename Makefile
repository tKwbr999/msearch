check:
	make lint && make fmt-check && make build

lint:
	npm run lint

fmt:
	npm run fmt

fmt-check:
	npm run fmt:check

build:
	npm run build

dev:
	npm run dev

start:
	npm start

check-all:
	make lint && make fmt-check && make build
